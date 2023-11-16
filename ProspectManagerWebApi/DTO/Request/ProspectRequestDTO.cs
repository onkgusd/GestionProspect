using ProspectManagerWebApi.Models;
using System.ComponentModel.DataAnnotations;

namespace ProspectManagerWebApi.DTO.Request
{
    public class ProspectRequestDTO
    {
        [Required]
        public string? Nom { get; set; } = "";
        public string? Departement { get; set; }
        public string? Adresse { get; set; }
        public string? Telephone { get; set; }
        public string? Mail { get; set; }
        public string? SecteurActivite { get; set; }
        public Statut Statut { get; set; } = new Statut();
        public bool Actif { get; set; }
        public TypeOrganisme TypeOrganisme { get; set; } = new TypeOrganisme();
    }
}
