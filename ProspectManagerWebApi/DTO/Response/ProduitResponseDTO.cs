using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.DTO.Response
{
    public class ProduitResponseDTO
    {
        public int Id { get; set; }
        public string Reference { get; set; }
        public string Libelle { get; set; }
        public string? Description { get; set; }
    }
}
