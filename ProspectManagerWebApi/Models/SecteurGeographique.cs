using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.Models
{
    public class SecteurGeographique : ILabelable
    {
        public int Id { get; set; }

        [Required]
        public string Libelle { get; set; } = string.Empty;
        public bool? Actif { get; set; }
        public string GetLabel() => Libelle;
    }
}
