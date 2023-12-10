using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.DTO.Response
{
    public class ContactResponseDTO
    {
        public int Id { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string? Fonction { get; set; }
        public string? Email { get; set; }
        public string? Telephone { get; set; }
        public bool Actif { get; set; } = true;
        public ICollection<ModificationResponseDTO> Modifications { get; set; } = new List<ModificationResponseDTO>();
    }
}
