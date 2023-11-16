using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.DTO.Request
{
    public class ProspectSearchRequestDTO
    {
        public string[] Noms { get; set; }
        public Statut[] Statuts { get; set; }
        public string[] Departements { get; set; }
        public string[] SecteursActivite { get; set; }
        public Produit[] Produits { get; set; }
        public TypeOrganisme[] TypesOrganisme { get; set; }
    }
}
