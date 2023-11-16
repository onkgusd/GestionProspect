namespace ProspectManagerWebApi.DTO.Request
{
    public class PasswordReinitRequestDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public string NouveauMotDePasse { get; set; } = string.Empty;
    }
}
