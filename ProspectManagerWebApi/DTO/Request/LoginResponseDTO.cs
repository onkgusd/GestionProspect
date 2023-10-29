namespace ProspectManagerWebApi.DTO.Request
{
    public class LoginResponseDTO
    {
        public string Token { get; set; }
        public DateTime ExpirationDate {  get; set; }
    }
}
