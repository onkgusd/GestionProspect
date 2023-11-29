using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.DTO.Request
{
    public class ContactRequestDTO : ILabelable
    {
        public int? Id { get; set; }
        public string? Nom { get; set; }
        public string? Fonction { get; set; }
        public string? Email { get; set; }
        public string? Telephone { get; set; }
        public bool Actif { get; set; } = true;

        public string GetLabel()
        {
            return Nom ?? string.Empty;
        }
    }
}
