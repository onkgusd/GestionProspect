﻿using System.Text.Json.Serialization;

namespace ProspectManagerWebApi.Models
{
    public class Evenement : ITableHistorique
    {
        public int Id { get; set; }
        public TypeEvenement? TypeEvenement { get; set; }
        public DateTimeOffset DateEvenement {  get; set; }
        public string? Resultat { get; set; }
        public Contact? Contact { get; set; }
        public int Evaluation { get; set; }
        public ICollection<Produit>? Produits { get; set; }
        public Utilisateur? Utilisateur { get; set; }
        public ICollection<Modification> Modifications { get; set; } = new List<Modification>();
        [JsonIgnore]
        public Prospect Prospect { get; set; } = new Prospect();
    }
}
