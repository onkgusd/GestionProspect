using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.DTO.Response
{
    public class EvenementResponseDTO
    {
        public int Id { get; set; }
        public TypeEvenement TypeEvenement { get; set; }
        public DateTimeOffset DateEvenement { get; set; }
        public string? Resultat { get; set; }
        public Contact? Contact { get; set; }
        public ICollection<ProduitResponseDTO>? Produits { get; set; }
        public Utilisateur? Utilisateur { get; set; }
        public ICollection<Modification>? Modifications { get; set; }
    }
}
