using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.Models
{
    [Index(nameof(Nom), IsUnique = true)]
    public class Prospect : ITableHistorique
    {
        public int Id { get; set; }

        [Required]
        public string? Nom { get; set; } = "";
        public string? Departement { get; set; }
        public string? Adresse { get; set; }
        public string? Telephone { get; set; }
        public string? Mail { get; set; }
        public string? SecteurActivite { get; set; }
        public DateTimeOffset DateCreation { get; set; }
        public Statut Statut { get; set; } = new Statut();
        public bool Actif {  get; set; }
        public TypeOrganisme TypeOrganisme { get; set; } = new TypeOrganisme();
        public ICollection<Contact> Contacts { get; set; } = new List<Contact>();
        public Utilisateur UtilisateurCreation { get; set; } = new Utilisateur();
        public ICollection<Modification> Modifications { get; set; } = new List<Modification>();
        public ICollection<ProduitProspect> ProduitProspects { get; set; } = new List<ProduitProspect>();
        public ICollection<Evenement> Evenements { get; set; } = new List<Evenement>();
    }
}
