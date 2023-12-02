using ProspectManagerWebApi.Models;
using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.DTO.Response
{
    public class ProspectResponseDTO
    {
        public int Id { get; set; }
        public string? Nom { get; set; }
        public SecteurGeographique? SecteurGeographique { get; set; }
        public string? Adresse { get; set; }
        public string? Telephone { get; set; }
        public string? Mail { get; set; }
        public string? SecteurActivite { get; set; }
        public DateTimeOffset DateCreation { get; set; }
        public Statut? Statut { get; set; }
        public TypeOrganisme? TypeOrganisme { get; set; }
        public ICollection<ContactResponseDTO>? Contacts { get; set; }
        public UtilisateurResponseDTO? UtilisateurCreation { get; set; }
        public ICollection<ModificationResponseDTO>? Modifications { get; set; }
        public ICollection<ProduitProspectResponseDTO>? ProduitProspects { get; set; }
        public ICollection<EvenementResponseDTO>? Evenements { get; set; }
    }
}
