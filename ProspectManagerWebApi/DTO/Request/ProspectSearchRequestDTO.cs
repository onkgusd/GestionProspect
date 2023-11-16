using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.DTO.Request
{
    public class ProspectSearchRequestDTO
    {
        public string[] Noms { get; set; } = new string[0];
        public Statut[] Statuts { get; set; } = new Statut[0];
        public string[] Departements { get; set; } = new string[0];
        public string[] SecteursActivite { get; set; } = new string[0];
        public Produit[] Produits { get; set; } = new Produit[0];
        public TypeOrganisme[] TypesOrganisme { get; set; } = new TypeOrganisme[0];
    }
}
