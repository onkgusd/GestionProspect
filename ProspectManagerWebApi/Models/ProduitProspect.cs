namespace ProspectManagerWebApi.Models
{
    internal class ProduitProspect : ITableHistorique
    {
        public int Id { get; set; }
        public Produit Produit { get; set; }
        public Prospect Prospect { get; set; }
        public int ProbabiliteSucces { get; set; }
        public ICollection<Modification> Modifications { get; set; }
    }
}
