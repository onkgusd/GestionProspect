namespace ProspectManagerWebApi.DTO.Response
{
    public class LoginResponseDTO
    {
        public string Token { get; set; } = string.Empty;
        public DateTimeOffset ExpirationDate { get; set; }
        public UtilisateurResponseDTO Utilisateur { get; set; } = new UtilisateurResponseDTO();
    }
}
