using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.DTO.Response
{
    public class ProspectSummaryResponseDto
    {
        public int Id { get; set; }
        public string? Nom { get; set; }
        public bool? Actif {  get; set; }
        public SecteurGeographique? SecteurGeographique { get; set; }
        public string? Adresse { get; set; }
        public string? Telephone { get; set; }
        public string? Mail { get; set; }
        public string? SecteurActivite { get; set; }
        public DateTimeOffset DateCreation { get; set; }
        public Statut? Statut { get; set; }
        public TypeOrganisme? TypeOrganisme { get; set; }
        public int ContactsCount { get; set; }
        public UtilisateurResponseDTO? UtilisateurCreation { get; set; }
        public int ProduitProspectsCount { get; set; }
        public int EvenementsCount { get; set; }
    }
}
