using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.DTO.Response
{
    public class ModificationResponseDTO
    {
        public DateTimeOffset DateModification { get; set; }
        public string Libelle { get; set; } = string.Empty;
        public string Champ { get; set; } = string.Empty;
        public string AncienneValeur { get; set; } = string.Empty;
        public string NouvelleValeur { get; set; } = string.Empty;
        public UtilisateurResponseDTO Utilisateur { get; set; } = new UtilisateurResponseDTO();
    }
}
