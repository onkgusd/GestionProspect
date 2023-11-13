namespace ProspectManagerWebApi.DTO.Response
{
    public class UtilisateurResponseDTO
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string? MotDePasse { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
        public bool Actif { get; set; }
        public DateTimeOffset? DateConnexion { get; set; }
        public DateTimeOffset? DateModificationMotDePasse { get; set; }
    }
}
