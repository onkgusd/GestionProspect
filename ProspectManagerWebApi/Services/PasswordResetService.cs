using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using ProspectManagerWebApi.Helpers;
using System.Web;

namespace ProspectManagerWebApi.Services
{
    internal class PasswordResetService
    {
        private readonly ProspectManagerDbContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;

        public PasswordResetService(ProspectManagerDbContext dbContext,
                                    IConfiguration configuration,
                                    EmailService emailService)
        {
            _dbContext = dbContext;
            _configuration = configuration;
            _emailService = emailService;
        }

        private string GeneratePasswordResetToken()
        {
            var tokenData = new byte[32];
            RandomNumberGenerator.Fill(tokenData);
            return Convert.ToBase64String(tokenData);
        }

        private async Task SendPasswordResetEmail(string email, string token, Utilisateur utilisateur)
        {
            var encodedToken = HttpUtility.UrlEncode($"{token}");
            var resetLink = $"{_configuration["Client:ClientBaseUrl"]}/login/reinit-mot-de-passe?token={encodedToken}";
            var emailBody = File.ReadAllText("Resources/EmailTemplates/ResetPassword.html");
            
            emailBody = emailBody.Replace("[Name]", utilisateur.Login);
            emailBody = emailBody.Replace("[ResetPasswordLink]", resetLink);

            await _emailService.SendEmailAsync(email,
                "Votre demande réinitialisation de mot de passe",
                emailBody);
        }

        public async Task RequestPasswordReset(string email)
        {
            var token = GeneratePasswordResetToken();

            var utilisateur = await _dbContext.Utilisateurs.Include(u => u.PasswordResetTokens)
                                                           .FirstOrDefaultAsync(u => u.Email == email);

            if (utilisateur == null)
                return;

            await SaveTokenToDatabase(utilisateur, token, DateTime.UtcNow.AddHours(1));

            await SendPasswordResetEmail(email, token, utilisateur);
        }

        private async Task SaveTokenToDatabase(Utilisateur utilisateur, string token, DateTime expirationDate)
        {
            var passwordResetToken = new PasswordResetToken
            {
                Token = token,
                ExpirationDate = expirationDate,
                IsUsed = false
            };

            utilisateur.PasswordResetTokens?.Add(passwordResetToken);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> ReinitPassword(string email, string motDePasse, string token)
        {
            var utilisateur = await _dbContext.Utilisateurs
                .Include(u => u.PasswordResetTokens)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (utilisateur == null) return false;

            var prt = utilisateur.PasswordResetTokens?.FirstOrDefault(prt => !prt.IsUsed
                && prt.Token == token
                && prt.ExpirationDate > DateTime.UtcNow);

            if (prt == null) return false;

            utilisateur.Empreinte = PasswordHelper.HashPassword(motDePasse);
            utilisateur.DateModificationMotDePasse = DateTime.UtcNow;

            prt.IsUsed = true;

            int changes = await _dbContext.SaveChangesAsync();
            return changes > 0;
        }
    }
}
