using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.Models
{
    [Index(nameof(Reference), IsUnique = true)]
    [Index(nameof(Libelle), IsUnique = true)]
    public class Produit : ILabelable, ITableHistorique
    {
        public int Id { get; set; }

        [Required]
        public string? Reference { get; set; }

        [Required]
        public string Libelle {  get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool? Actif { get; set; }
        public ICollection<ProduitProspect>? ProduitProspects { get; set; }
        public ICollection<Evenement>? Evenements { get; set; }
        public ICollection<Modification> Modifications { get; set; } = new List<Modification>();

        public string GetLabel() => Libelle;
    }
}
