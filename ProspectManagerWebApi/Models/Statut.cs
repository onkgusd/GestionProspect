using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.Models
{
    [Index(nameof(Libelle), IsUnique = true)]
    public class Statut
    {
        public int Id { get; set; }

        [Required]
        public string? Libelle { get; set; }
    }
}
