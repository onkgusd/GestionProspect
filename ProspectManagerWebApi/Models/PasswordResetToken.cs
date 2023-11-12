namespace ProspectManagerWebApi.Models
{
    public class PasswordResetToken
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool IsUsed { get; set; }
    }
}
