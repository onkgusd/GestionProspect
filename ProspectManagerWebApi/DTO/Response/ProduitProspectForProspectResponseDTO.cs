﻿namespace ProspectManagerWebApi.DTO.Response
{
    public class ProduitProspectForProspectResponseDTO
    {
        public ProduitResponseDTO Produit { get; set; } = new ProduitResponseDTO();
        public double ProbabiliteSucces { get; set; }
        public DateTimeOffset DateProposition { get; set; }
    }
}
