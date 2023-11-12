namespace ProspectManagerWebApi.Models
{
    public class Contact : ITableHistorique
    {
        public int Id { get; set; }
        public string? Nom { get; set; }
        public string? Fonction { get; set; }
        public string? Email { get; set; } 
        public string? Telephone { get; set; }
        public bool Actif { get; set; } = true;
        public ICollection<Modification>? Modifications { get; set; }
    }
}
