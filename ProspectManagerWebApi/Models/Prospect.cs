using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.Models
{
    internal class Prospect : ITableHistorique
    {
        public int Id { get; set; }

        [Required]
        public string Nom { get; set; }
        public string? Departement { get; set; }
        public string? Adresse { get; set; }
        public string? Telephone { get; set; }
        public string? Mail { get; set; }
        public string? SecteurActivite { get; set; }
        public DateTime DateCreation { get; set; }
        public Statut? Statut { get; set; }
        public TypeOrganisme? TypeOrganisme { get; set; }
        public ICollection<Contact>? Contacts { get; set; }
        public Utilisateur? UtilisateurCreation { get; set; }
        public ICollection<Modification>? Modifications { get; set; }
        public ICollection<ProduitProspect>? ProduitProspects { get; set; }
    }
}
