namespace ProspectManagerWebApi.Models
{
    public class Utilisateur
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string? Empreinte { get; set; }
        public DateTime? DateConnexion {  get; set; }
        public DateTime? DateModificationMotDePasse { get; set; }
        public string Role { get; set; }
        public bool Actif { get; set; }
    }
}
