﻿namespace ProspectManagerWebApi.Models
{
    internal class Modification
    {
        public int Id { get; set; }
        public DateTime DateModification { get; set; }
        public string Table {  get; set; }
        public string Champ {  get; set; }
        public string AncienneValeur { get; set; }
        public string NouvelleValeur { get; set; }
        public Utilisateur Utilisateur { get; set; }
    }
}
