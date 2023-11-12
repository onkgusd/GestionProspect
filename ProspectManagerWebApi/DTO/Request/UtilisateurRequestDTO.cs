using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.DTO.Request
{
    public class UtilisateurRequestDTO
    {
        public int? Id { get; set; }
        [Required]
        public string? Login { get; set; }
        [Required]
        public string? Role { get; set; }
        public bool Actif { get; set; }
        [MinLength(12)]
        public string? MotDePasse { get; set; }
        [Required]
        public string? Email { get; set; }
    }
}
