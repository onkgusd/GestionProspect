using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.Data
{
    internal class ProspectManagerDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=ProspectManager;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
        }

        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Evenement> Evenements { get; set; }
        public virtual DbSet<Modification> Modifications { get; set; }
        public virtual DbSet<Produit> Produits { get; set; }
        public virtual DbSet<Prospect> Prospects { get; set; }
        public virtual DbSet<ProduitProspect> ProduitProspect { get; set; }
        public virtual DbSet<Statut> Statuts { get; set; }
        public virtual DbSet<TypeEvenement> TypesEvenement { get; set; }
        public virtual DbSet<TypeOrganisme> TypesOrganisme { get; set; }
        public virtual DbSet<Utilisateur> Utilisateurs { get; set; }
    }
}
