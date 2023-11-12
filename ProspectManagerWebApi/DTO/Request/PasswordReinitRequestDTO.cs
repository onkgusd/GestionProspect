namespace ProspectManagerWebApi.DTO.Request
{
    public class PasswordReinitRequestDTO
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string NouveauMotDePasse { get; set; }
    }
}
