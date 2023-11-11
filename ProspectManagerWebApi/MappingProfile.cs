using AutoMapper;
using ProspectManagerWebApi.DTO.Request;
using ProspectManagerWebApi.DTO.Response;
using ProspectManagerWebApi.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Prospect, ProspectResponseDTO>();
        CreateMap<Produit, ProduitResponseDTO>();
        CreateMap<ProduitProspect, ProduitProspectResponseDTO>();
        CreateMap<Evenement, EvenementResponseDTO>();
        CreateMap<Utilisateur, UtilisateurResponseDTO>();

        CreateMap<UtilisateurRequestDTO, Utilisateur>();
    }
}
