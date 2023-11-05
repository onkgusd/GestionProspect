namespace ProspectManagerWebApi.Models
{
    public class Produit
    {
        public int Id { get; set; }
        public string Reference { get; set; }
        public string Libelle {  get; set; }
        public string? Description { get; set; }
        public ICollection<ProduitProspect>? ProduitProspects { get; set; }
        public ICollection<Evenement>? Evenements { get; set; }
    }
}
