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
        CreateMap<Modification, ModificationResponseDTO>();
        CreateMap<Contact, ContactResponseDTO>();
        CreateMap<Prospect, ProspectSummaryResponseDto>();

        CreateMap<UtilisateurRequestDTO, Utilisateur>();
        CreateMap<ProspectRequestDTO, Prospect>();
        CreateMap<EvenementRequestDTO, Evenement>();
        CreateMap<ContactRequestDTO, Contact>();
    }
}
