using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using ProspectManagerWebApi.Helpers;
using System.Web;
using System.Net;

namespace ProspectManagerWebApi.Services
{
    internal class PasswordManagerService
    {
        private readonly ProspectManagerDbContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;

        public PasswordManagerService(ProspectManagerDbContext dbContext,
                                    IConfiguration configuration,
                                    EmailService emailService)
        {
            _dbContext = dbContext;
            _configuration = configuration;
            _emailService = emailService;
        }

        internal async Task RequestPasswordReset(string email, IPAddress? adresseIP = null)
        {
            var token = GeneratePasswordResetToken();

            var utilisateur = await _dbContext.Utilisateurs.Include(u => u.PasswordResetTokens)
                                                           .FirstOrDefaultAsync(u => u.Email == email);

            if (utilisateur == null)
                return;

            if (adresseIP.IsIPv4MappedToIPv6)
            {
                adresseIP = adresseIP.MapToIPv4();
            }

            var tokenDuration = int.Parse(_configuration["PasswordLink:DureeValiditeLienReinitMdpEnHeure"] ?? "0");

            await SaveTokenToDatabase(utilisateur, token, DateTime.UtcNow.AddHours(tokenDuration), adresseIP.ToString() ?? "Adresse IP inconnue");

            await SendPasswordResetEmail(utilisateur, token, tokenDuration);
        }

        internal async Task<bool> ReinitPassword(string email, string motDePasse, string token)
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

        internal async Task SendInvitationEmail(Utilisateur utilisateur)
        {
            var token = GeneratePasswordResetToken();
            var tokenDuration = int.Parse(_configuration["PasswordLink:DureeValiditeLienInitMdpEnJour"] ?? "0");
            var expirationDate = DateTime.UtcNow.AddDays(tokenDuration);

            var encodedToken = HttpUtility.UrlEncode($"{token}");

            await _dbContext.Entry(utilisateur).Collection(u => u.PasswordResetTokens).LoadAsync();

            await SaveTokenToDatabase(utilisateur, token, expirationDate);

            var resetLink = $"{_configuration["Client:ClientBaseUrl"]}/login/reinit-mot-de-passe?token={encodedToken}";
            var emailBody = File.ReadAllText("Resources/EmailTemplates/WelcomeEmail.html");

            emailBody = emailBody.Replace("[Name]", utilisateur.Login);
            emailBody = emailBody.Replace("[InitPasswordLink]", resetLink);
            emailBody = emailBody.Replace("[DureeValiditeLienInitMdpEnJour]", tokenDuration.ToString());

            await _emailService.SendEmailAsync(utilisateur.Email,
                "Création de votre compte",
                emailBody);
        }

        private string GeneratePasswordResetToken()
        {
            var tokenData = new byte[32];
            RandomNumberGenerator.Fill(tokenData);
            return Convert.ToBase64String(tokenData);
        }

        private async Task SendPasswordResetEmail(Utilisateur utilisateur, string token, int tokenDuration)
        {
            var encodedToken = HttpUtility.UrlEncode($"{token}");
            var resetLink = $"{_configuration["Client:ClientBaseUrl"]}/login/reinit-mot-de-passe?token={encodedToken}";
            var emailBody = File.ReadAllText("Resources/EmailTemplates/ResetPasswordEmail.html");
            
            emailBody = emailBody.Replace("[Name]", utilisateur.Login);
            emailBody = emailBody.Replace("[ResetPasswordLink]", resetLink);
            emailBody = emailBody.Replace("[DureeValiditeLienReinitMdpEnHeure]", $"{tokenDuration} {(tokenDuration == 1 ? "heure" : "heures")}");

            await _emailService.SendEmailAsync(utilisateur.Email,
                "Votre demande réinitialisation de mot de passe",
                emailBody);
        }

        private async Task SaveTokenToDatabase(Utilisateur utilisateur, string token, DateTime expirationDate, string IPAddress = "")
        {
            var passwordResetToken = new PasswordResetToken
            {
                Token = token,
                ExpirationDate = expirationDate,
                IsUsed = false,
                IPAddress = IPAddress
            };

            utilisateur.PasswordResetTokens?.Add(passwordResetToken);
            await _dbContext.SaveChangesAsync();
        }
    }
}
