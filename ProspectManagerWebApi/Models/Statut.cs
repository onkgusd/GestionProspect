using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.Models
{
    [Index(nameof(Libelle), IsUnique = true)]
    public class Statut : ILabelable
    {
        public int Id { get; set; }

        [Required]
        public string Libelle { get; set; } = string.Empty;
        public bool? Actif { get; set; }
        public string GetLabel() => Libelle;
    }
}
