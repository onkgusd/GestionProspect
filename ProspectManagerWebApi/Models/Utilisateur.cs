using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ProspectManagerWebApi.Models
{
    [Index(nameof(Email), IsUnique = true)]
    [Index(nameof(Login), IsUnique = true)]
    public class Utilisateur : ILabelable
    {
        public int Id { get; set; }

        [Required]
        public string Login { get; set; } = string.Empty;
        [JsonIgnore]
        public string Empreinte { get; set; } = string.Empty;
        public DateTimeOffset? DateConnexion {  get; set; }
        [JsonIgnore]
        public DateTimeOffset? DateModificationMotDePasse { get; set; }
        public string Role { get; set; } = string.Empty;
        public bool Actif { get; set; }

        [Required]
        public string? Email { get; set; }
        [JsonIgnore]
        public ICollection<PasswordResetToken>? PasswordResetTokens { get; set; }

        public string GetLabel() => Login;
    }
}
