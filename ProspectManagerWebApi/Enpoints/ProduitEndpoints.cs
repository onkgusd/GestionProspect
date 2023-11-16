using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.Enpoints
{
    public static class ProduitEndpoints
    {
        public static void Map(WebApplication app, IMapper mapper)
        {
            app.MapGet("/produits", [Authorize] async (ProspectManagerDbContext db) =>
                await db.Produits.ToListAsync());

            app.MapGet("/produits/{idproduit:int}", [Authorize] async (int idProduit, ProspectManagerDbContext db) =>
                await db.Produits.FindAsync(idProduit) is Produit produit ?
                Results.Ok(produit) : Results.NotFound());

            app.MapPost("/produits", [Authorize(Policy = "Admin")] async ([FromBody] Produit produit, ProspectManagerDbContext db) =>
            {
                db.Produits.Add(produit);
                await db.SaveChangesAsync();

                return Results.Created($"/produits/{produit.Id}", produit);
            });

            app.MapPut("/produits/{idproduit:int}", [Authorize] async ([FromBody] Produit updatedProduit, int idProduit, ProspectManagerDbContext db) =>
            {
                if (idProduit != updatedProduit.Id)
                    return Results.BadRequest("Les identifiants produits ne sont pas cohérents.");

                var existingProduit = await db.Produits.FindAsync(idProduit);
                if (existingProduit == null)
                    return Results.NotFound();

                db.Entry(existingProduit).CurrentValues.SetValues(updatedProduit);
                await db.SaveChangesAsync();

                return Results.Ok(existingProduit);
            });

            app.MapDelete("/produits/{idproduit:int}", [Authorize(Policy = "Admin")] async (int idProduit, ProspectManagerDbContext db) =>
            {
                var existingProduit = await db.Produits
                                              .Include(p => p.Evenements)
                                              .Include(p => p.ProduitProspects)
                                              .FirstOrDefaultAsync(p => p.Id == idProduit);

                if (existingProduit == null)
                    return Results.NotFound();

                var nbProduitProspect = existingProduit.ProduitProspects?.Count();
                var nbEvenement = existingProduit.Evenements?.Count();

                if (nbEvenement + nbProduitProspect == 0)
                    db.Produits.Remove(existingProduit);
                else
                    existingProduit.Actif = false;

                await db.SaveChangesAsync();

                return Results.Ok(new { Statut = nbEvenement + nbProduitProspect == 0 ? "Deleted" : "Disabled" });
            });

            app.MapDelete("/prospects/{idprospect:int}", [Authorize(Policy = "Admin")] async (int idProspect, ProspectManagerDbContext db) =>
            {
                var existingProspect = await db.Prospects
                                               .Include(p => p.Contacts)
                                               .Include(p => p.Evenements)
                                               .Include(p => p.ProduitProspects)
                                               .FirstOrDefaultAsync(p => p.Id == idProspect);
                if (existingProspect == null)
                    return Results.NotFound();

                var nbContact = existingProspect.Contacts?.Count();
                var nbEvenement = existingProspect.Evenements?.Count();
                var nbProduitProspect = existingProspect.ProduitProspects?.Count();

                if (nbContact + nbEvenement + nbProduitProspect == 0)
                    db.Prospects.Remove(existingProspect);
                else
                    existingProspect.Actif = false;

                await db.SaveChangesAsync();

                return Results.Ok(new { Statut = nbContact + nbEvenement + nbProduitProspect == 0 ? "Deleted" : "Disabled" });
            });
        }
    }
}
