namespace ProspectManagerWebApi.Models
{
    public class Modification
    {
        public int Id { get; set; }
        public DateTimeOffset DateModification { get; set; }
        public string Champ {  get; set; } = string.Empty;
        public string AncienneValeur { get; set; } = string.Empty;
        public string NouvelleValeur { get; set; } = string.Empty;
        public Utilisateur Utilisateur { get; set; } = new Utilisateur();
        public string JsonObjectBackup { get; set; } = string.Empty;
    }
}
