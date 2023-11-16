using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.DTO.Request;
using ProspectManagerWebApi.DTO.Response;
using ProspectManagerWebApi.Helpers;
using ProspectManagerWebApi.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProspectManagerWebApi.Enpoints
{
    public class AuthenticationEndPoints
    {
        public static void Map(WebApplication app, IMapper map, WebApplicationBuilder builder)
        {
            app.MapPost("/authentication/getToken",
            [AllowAnonymous] async (LoginRequestDTO user, ProspectManagerDbContext db) =>
            {
                var utilisateur = await db.Utilisateurs
                                          .FirstAsync(u => (u.Login == user.Login
                                                           || u.Email == user.Login)
                                                           && u.Actif);

                if (utilisateur == null || !PasswordHelper.VerifyPassword(user.Password, utilisateur.Empreinte))
                    return Results.Unauthorized();

                utilisateur.DateConnexion = DateTime.UtcNow;
                await db.SaveChangesAsync();

                var issuer = builder.Configuration["Jwt:Issuer"];
                var audience = builder.Configuration["Jwt:Audience"];
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new Exception("Jwt key is not set.")));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512);

                var expirationDate = DateTime.UtcNow.AddHours(24);
                var token = new JwtSecurityToken(issuer: issuer,
                    audience: audience,
                    signingCredentials: credentials,
                    claims: new[]
                        {
                            new Claim(ClaimTypes.Name, utilisateur.Login),
                            new Claim(ClaimTypes.Role, utilisateur.Role)
                    },
                    expires: expirationDate);

                var tokenHandler = new JwtSecurityTokenHandler();
                var stringToken = tokenHandler.WriteToken(token);

                return Results.Ok(new LoginResponseDTO() { Token = stringToken, ExpirationDate = expirationDate });
            });

            app.MapPost("/authentication/demande-reinitialisation", async (HttpContext http, PasswordManagerService resetService, [FromBody] PasswordResetLinkRequestDTO passwordResetLinkRequest) =>
            {
                await resetService.RequestPasswordReset(passwordResetLinkRequest.Email, http.Connection.RemoteIpAddress);
                return Results.Ok("Demande de réinitialisation envoyée.");
            });

            // Endpoint pour réinitialiser le mot de passe
            app.MapPost("/authentication/reinitialiser-motdepasse", async (HttpContext http, PasswordManagerService resetService, [FromBody] PasswordReinitRequestDTO passwordReinitRequest) =>
                await resetService.ReinitPassword(passwordReinitRequest.Email, passwordReinitRequest.NouveauMotDePasse, passwordReinitRequest.Token)
                ? Results.Ok("Mot de passe réinitialisé.") : Results.BadRequest("Impossible de réinitialiser le mot de passe (token invalide ou déjà utilisé)."));

        }
    }
}
