using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.Models
{
    [Index(nameof(Token), IsUnique = true)]
    public class PasswordResetToken
    {
        public int Id { get; set; }

        [Required]
        public string? Token { get; set; }
        [Required]
        public DateTimeOffset ExpirationDate { get; set; }
        public bool IsUsed { get; set; }
        public string? IPAddress { get; set; }
    }
}
