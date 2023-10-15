namespace ProspectManagerWebApi.Models
{
    internal class Evenement : ITableHistorique
    {
        public int Id { get; set; }
        public TypeEvenement TypeEvenement { get; set; }
        public DateTime DateEvenement {  get; set; }
        public string Resultat {  get; set; }
        public Contact Contact { get; set; }
        public virtual ICollection<Produit> Produits { get; set; }
        public Utilisateur Utilisateur { get; set; }
        public virtual ICollection<Modification> Modifications { get; set; }
    }
}
