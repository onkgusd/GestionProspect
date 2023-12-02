using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.DTO.Response;
using ProspectManagerWebApi.Helpers;
using ProspectManagerWebApi.Models;
using ProspectManagerWebApi.Services;
using System.Text.Json;

namespace ProspectManagerWebApi.Enpoints
{
    public static class ProduitEndpoints
    {
        public static void Map(WebApplication app, IMapper mapper)
        {
            app.MapGet("/produits", [Authorize] async (ProspectManagerDbContext db) =>
                await db.Produits.ToListAsync());

            app.MapGet("/produits/{idproduit:int}", [Authorize] async (int idProduit, ProspectManagerDbContext db) =>
                await db.Produits
                    .Include(p => p.ProduitProspects)
                        .ThenInclude(pp => pp.Prospect)
                        .ThenInclude(p => p.Statut)
                    .Include(p => p.ProduitProspects)
                        .ThenInclude(pp => pp.Prospect)
                        .ThenInclude(p => p.SecteurGeographique)
                    .Include(p => p.ProduitProspects)
                        .ThenInclude(pp => pp.Prospect)
                        .ThenInclude(p => p.TypeOrganisme)
                    .FirstOrDefaultAsync(p => p.Id == idProduit) is Produit produit ?
                Results.Ok(mapper.Map<ProduitResponseDTO>(produit)) : Results.NotFound());

            app.MapPost("/produits", [Authorize(Policy = "Admin")] async ([FromBody] Produit produit, ProspectManagerDbContext db) =>
            {
                db.Produits.Add(produit);
                await db.SaveChangesAsync();

                return Results.Created($"/produits/{produit.Id}", produit);
            });

            app.MapPut("/produits/{idproduit:int}", [Authorize] async (
                                       [FromBody] Produit updatedProduit,
                                       int idProduit,
                                       ProspectManagerDbContext db,
                                       UserService userService) =>
            {
                if (idProduit != updatedProduit.Id)
                    return Results.BadRequest("Les identifiants produits ne sont pas cohérents.");

                var existingProduit = await db.Produits.FindAsync(idProduit);
                if (existingProduit == null)
                    return Results.NotFound();

                var modifications = ModificationHelper.GetModifications(await userService.GetCurrentUser(), existingProduit, updatedProduit);

                modifications?.ForEach(m => existingProduit.Modifications.Add(m));

                db.Entry(existingProduit).CurrentValues.SetValues(updatedProduit);
                await db.SaveChangesAsync();

                return Results.Ok(existingProduit);
            });

            app.MapDelete("/produits/{idproduit:int}", [Authorize] async (int idProduit,
                                                                        ProspectManagerDbContext db,
                                                                        UserService userService) =>
            {
                var existingProduit = await db.Produits
                                              .Include(p => p.Evenements)
                                              .Include(p => p.ProduitProspects)
                                              .Include(p => p.Modifications)
                                              .FirstOrDefaultAsync(p => p.Id == idProduit);

                if (existingProduit == null)
                    return Results.NotFound();

                var nbProduitProspect = existingProduit.ProduitProspects?.Count();
                var nbEvenement = existingProduit.Evenements?.Count();

                if (nbEvenement + nbProduitProspect == 0)
                {
                    db.Modifications.Add(new Modification
                    {
                        AncienneValeur = $"Produit {existingProduit.Libelle} ({existingProduit.Reference})",
                        NouvelleValeur = "Produit supprimé",
                        DateModification = DateTime.UtcNow,
                        Utilisateur = await userService.GetCurrentUser(),
                        JsonObjectBackup = JsonSerializer.Serialize(existingProduit)
                    });

                    existingProduit.Modifications.Clear();
                    db.Produits.Remove(existingProduit);
                }
                else
                {
                    existingProduit.Modifications.Add(new Modification
                    {
                        AncienneValeur = $"Actif",
                        NouvelleValeur = "Desactivé (suite tentative de suppression)",
                        DateModification = DateTime.UtcNow,
                        Utilisateur = await userService.GetCurrentUser()
                    });

                    existingProduit.Actif = false;
                }

                await db.SaveChangesAsync();

                return Results.Ok(new { Statut = nbEvenement + nbProduitProspect == 0 ? "Deleted" : "Disabled" });
            });
        }
    }
}
