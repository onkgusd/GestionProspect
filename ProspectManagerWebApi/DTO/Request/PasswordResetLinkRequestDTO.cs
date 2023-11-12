using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.DTO.Request
{
    public class PasswordResetLinkRequestDTO
    {
        [Required]
        public string Email { get; set; }
    }
}
