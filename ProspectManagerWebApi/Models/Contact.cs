namespace ProspectManagerWebApi.Models
{
    internal class Contact : ITableHistorique
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Fonction { get; set; }
        public string Email { get; set; } 
        public string Telephone { get; set; }
        public bool Actif { get; set; }
        public ICollection<Modification> Modifications { get; set; }
    }
}
