using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using ProspectManagerWebApi.Helpers;
using System.Security.Policy;
using System.Web;

namespace ProspectManagerWebApi.Services
{
    internal class PasswordResetService
    {
        private readonly ProspectManagerDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public PasswordResetService(ProspectManagerDbContext dbContext,
                                    IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        private string GeneratePasswordResetToken()
        {
            // Générer un jeton sécurisé
            using (var rng = new RNGCryptoServiceProvider())
            {
                var tokenData = new byte[32];
                rng.GetBytes(tokenData);
                return Convert.ToBase64String(tokenData);
            }
        }

        private async Task SendPasswordResetEmail(string email, string token)
        {
            var encodedToken = HttpUtility.UrlEncode($"{token}");
            var resetLink = $"{_configuration["Client:ClientBaseUrl"]}/login/reinit-mot-de-passe?token={encodedToken}";

            // Code pour envoyer l'email
            // Utilisez votre service d'emailing ici (par exemple, SmtpClient)
            Console.WriteLine($"Envoyer à {email}: {resetLink}");
        }

        // Appelez cette méthode lorsque l'utilisateur demande une réinitialisation de mot de passe
        public async Task RequestPasswordReset(string email)
        {
            var token = GeneratePasswordResetToken();

            var utilisateur = await _dbContext.Utilisateurs.Include(u => u.PasswordResetTokens)
                                                           .FirstOrDefaultAsync(u => u.Email == email);

            if (utilisateur == null)
                return;

            await SaveTokenToDatabase(utilisateur, token, DateTime.UtcNow.AddHours(1));

            await SendPasswordResetEmail(email, token);
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
                .FirstAsync(u => u.Email == email);

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
