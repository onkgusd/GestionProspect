namespace ProspectManagerWebApi.DTO.Request
{
    public class ContactRequestDTO
    {
        public string? Nom { get; set; }
        public string? Fonction { get; set; }
        public string? Email { get; set; }
        public string? Telephone { get; set; }
        public bool Actif { get; set; } = true;
    }
}
