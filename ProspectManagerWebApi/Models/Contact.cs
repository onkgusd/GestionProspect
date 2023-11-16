namespace ProspectManagerWebApi.Models
{
    public class Contact : ITableHistorique, ILabelable
    {
        public int Id { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string? Fonction { get; set; }
        public string? Email { get; set; } 
        public string? Telephone { get; set; }
        public bool Actif { get; set; } = true;
        public ICollection<Modification> Modifications { get; set; } = new List<Modification>();

        public string GetLabel() => Nom;
    }
}
