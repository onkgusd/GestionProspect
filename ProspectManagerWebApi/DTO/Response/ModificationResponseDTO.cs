using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.DTO.Response
{
    public class ModificationResponseDTO
    {
        public DateTimeOffset DateModification { get; set; }
        public string Champ { get; set; }
        public string AncienneValeur { get; set; }
        public string NouvelleValeur { get; set; }
        public UtilisateurResponseDTO Utilisateur { get; set; }
    }
}
