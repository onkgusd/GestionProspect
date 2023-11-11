using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.DTO.Request
{
    public class UtilisateurRequestDTO
    {
        public int? Id { get; set; }
        public string Login { get; set; }
        public string Role { get; set; }
        public bool Actif { get; set; }
        [MinLength(12)]
        public string? MotDePasse { get; set; }
    }
}
