using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.Models
{
    [Index(nameof(Reference), IsUnique = true)]
    [Index(nameof(Libelle), IsUnique = true)]
    public class Produit : ILabelable
    {
        public int Id { get; set; }

        [Required]
        public string? Reference { get; set; }

        [Required]
        public string? Libelle {  get; set; }
        public string? Description { get; set; }
        public bool? Actif { get; set; }
        public ICollection<ProduitProspect>? ProduitProspects { get; set; }
        public ICollection<Evenement>? Evenements { get; set; }
    }
}
