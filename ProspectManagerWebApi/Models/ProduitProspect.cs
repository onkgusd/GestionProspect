using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ProspectManagerWebApi.Models
{
    public class ProduitProspect : ITableHistorique
    {
        [Required]
        public int ProduitId { get; set; }

        public Produit? Produit { get; set; }

        [Required]
        public int ProspectId { get; set; }

        public Prospect? Prospect { get; set; }
        public int ProbabiliteSucces { get; set; }
        public ICollection<Modification>? Modifications { get; set; }
    }
}
