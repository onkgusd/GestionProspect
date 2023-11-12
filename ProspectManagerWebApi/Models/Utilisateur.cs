using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.Models
{
    public class Utilisateur
    {
        public int Id { get; set; }

        [Required]
        public string Login { get; set; }
        public string? Empreinte { get; set; }
        public DateTime? DateConnexion {  get; set; }
        public DateTime? DateModificationMotDePasse { get; set; }
        public string Role { get; set; }
        public bool Actif { get; set; }
        public string Email { get; set; }
        public ICollection<PasswordResetToken>? PasswordResetTokens { get; set; }
    }
}
