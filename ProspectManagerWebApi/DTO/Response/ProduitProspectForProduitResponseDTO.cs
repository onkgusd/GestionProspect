namespace ProspectManagerWebApi.DTO.Response
{
    public class ProduitProspectForProduitResponseDTO
    {
        public ProspectSummaryResponseDto Prospect { get; set; } = new ProspectSummaryResponseDto();
        public double ProbabiliteSucces { get; set; }
        public DateTimeOffset DateProposition { get; set; }
    }
}
