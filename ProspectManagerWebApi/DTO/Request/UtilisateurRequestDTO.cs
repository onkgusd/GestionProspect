using ProspectManagerWebApi.Models;
using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.DTO.Request
{
    public class UtilisateurRequestDTO : ILabelable
    {
        [Required]
        public string? Login { get; set; }
        [Required]
        public string? Role { get; set; }
        public bool Actif { get; set; }
        [MinLength(12)]
        public string? MotDePasse { get; set; }
        [Required]
        public string? Email { get; set; }

        public string GetLabel()
        {
            return Login ?? string.Empty;
        }
    }
}
