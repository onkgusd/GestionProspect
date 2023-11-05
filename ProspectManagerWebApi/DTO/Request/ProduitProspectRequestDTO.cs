using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.DTO.Request
{
    public class ProduitProspectRequestDTO
    {
        [Required]
        public int ProbabiliteSucces { get; set; }
    }
}