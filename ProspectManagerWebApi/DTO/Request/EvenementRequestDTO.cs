using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.DTO.Request
{
    public class EvenementRequestDTO
    {
        public TypeEvenement? TypeEvenement { get; set; }
        public DateTimeOffset DateEvenement { get; set; }
        public string? Resultat { get; set; }
        public ContactRequestDTO? Contact { get; set; }
        public int Evaluation { get; set; }
        public ICollection<Produit>? Produits { get; set; }
    }
}
