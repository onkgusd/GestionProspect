namespace ProspectManagerWebApi.Models
{
    internal class Produit
    {
        public int Id { get; set; }
        public string Reference { get; set; }
        public string Libelle {  get; set; }
        public string? Description { get; set; }
        public virtual ICollection<ProduitProspect> ProduitProspects { get; set; }
        public virtual ICollection<Evenement> Evenements { get; set; }
    }
}
