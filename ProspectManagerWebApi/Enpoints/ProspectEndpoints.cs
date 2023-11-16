using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.DTO.Request;
using ProspectManagerWebApi.DTO.Response;
using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.Enpoints
{
    public class ProspectEndpoints
    {
        public static void Map(WebApplication app, IMapper mapper)
        {
            app.MapGet("/prospects", async (ProspectManagerDbContext db) =>
                await db.Prospects.Include(p => p.TypeOrganisme)
                                  .Include(p => p.Statut)
                                  .ToListAsync());

            app.MapGet("/prospects/{idprospect:int}", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
            await db.Prospects.Include(p => p.Contacts)
                              .Include(p => p.Statut)
                              .Include(p => p.ProduitProspects)
                                  .ThenInclude(pp => pp.Produit)
                              .Include(p => p.Evenements)
                                  .ThenInclude(e => e.TypeEvenement)
                              .Include(p => p.Evenements)
                                  .ThenInclude(e => e.Contact)
                              .Include(p => p.Evenements)
                                  .ThenInclude(e => e.Produits)
                              .Include(p => p.UtilisateurCreation)
                              .Include(p => p.TypeOrganisme)
                              .FirstOrDefaultAsync(p => p.Id == idprospect) is Prospect prospect ?
            Results.Ok(mapper.Map<ProspectResponseDTO>(prospect)) : Results.NotFound());

            app.MapPost("/prospects/", [Authorize] async ([FromBody] Prospect prospect, ProspectManagerDbContext db, IHttpContextAccessor httpContextAccessor) =>
            {
                prospect.DateCreation = DateTime.UtcNow;

                var login = httpContextAccessor.HttpContext?.User.Identity?.Name;
                var utilisateur = await db.Utilisateurs.FirstOrDefaultAsync(u => u.Login == login);

                if (utilisateur == null)
                    return Results.Unauthorized();

                prospect.UtilisateurCreation = utilisateur;

                db.Prospects.Attach(prospect);
                await db.SaveChangesAsync();

                return Results.Created($"/prospects/{prospect.Id}", prospect);
            });

            app.MapPut("/prospects/{idprospect:int}", [Authorize] async ([FromBody] Prospect updatedProspect, int idProspect, ProspectManagerDbContext db) =>
            {
                if (idProspect != updatedProspect.Id)
                    return Results.BadRequest("Les identifiants produits ne sont pas cohérents.");

                var existingProspect = await db.Prospects.Include(p => p.Statut)
                                                         .Include(p => p.TypeOrganisme)
                                                         .FirstAsync(p => p.Id == idProspect);

                if (existingProspect == null)
                    return Results.NotFound();

                db.Entry(existingProspect).CurrentValues.SetValues(updatedProspect);

                if (updatedProspect.Statut.Id != existingProspect.Statut.Id)
                    existingProspect.Statut = await db.Statuts.FindAsync(updatedProspect.Statut.Id);

                if (updatedProspect.TypeOrganisme.Id != existingProspect.TypeOrganisme.Id)
                    existingProspect.TypeOrganisme = await db.TypesOrganisme.FindAsync(updatedProspect.TypeOrganisme.Id);

                await db.SaveChangesAsync();

                return Results.Ok(existingProspect);
            });

            app.MapGet("/prospects/{idprospect:int}/produits", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
                await db.ProduitProspect
                    .Where(pp => pp.Prospect.Id == idprospect)
                    .Include(pp => pp.Produit)
                    .ToArrayAsync() is ProduitProspect[] produitProspects ?
                Results.Ok(produitProspects) : Results.NotFound());

            app.MapPost("/prospects/{idprospect:int}/produits/{idproduit:int}", [Authorize] async ([FromBody] ProduitProspectRequestDTO produitProspect, [FromRoute] int idProspect, [FromRoute] int idProduit, ProspectManagerDbContext db) =>
            {
                db.ProduitProspect.Add(new ProduitProspect()
                {
                    Produit = db.Produits.Find(idProduit),
                    Prospect = db.Prospects.Find(idProspect),
                    ProbabiliteSucces = produitProspect.ProbabiliteSucces
                });

                await db.SaveChangesAsync();

                return Results.Created($"/prospects/{idProspect}/produits/{idProduit}", produitProspect);
            });

            app.MapPut("/prospects/{idprospect:int}/produits/{idproduit:int}",
                [Authorize] async ([FromBody] ProduitProspectRequestDTO produitProspect,
                [FromRoute] int idProspect,
                [FromRoute] int idProduit,
                ProspectManagerDbContext db) =>
                {
                    var existingProduitProspect = await db.ProduitProspect.FirstAsync(p => p.Prospect.Id == idProspect
                                                                                && p.Produit.Id == idProduit);

                    if (existingProduitProspect == null)
                        return Results.NotFound();

                    existingProduitProspect.ProbabiliteSucces = produitProspect.ProbabiliteSucces;

                    await db.SaveChangesAsync();

                    return Results.Ok(existingProduitProspect);
                });

            app.MapDelete("/prospects/{idprospect:int}", [Authorize(Policy = "Admin")] async (int idProspect, ProspectManagerDbContext db) =>
            {
                var existingProspect = await db.Prospects.FindAsync(idProspect);
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

            app.MapDelete("/prospects/{idprospect:int}/produits/{idproduit:int}",
                [Authorize] async (
                [FromRoute] int idProspect,
                [FromRoute] int idProduit,
                ProspectManagerDbContext db) =>
                {
                    var existingProduitProspect = await db.ProduitProspect.Where(pp => pp.Produit.Id == idProduit
                                                                        && pp.Prospect.Id == idProspect).FirstOrDefaultAsync();
                    if (existingProduitProspect == null)
                    {
                        return Results.NotFound();
                    }

                    db.ProduitProspect.Remove(existingProduitProspect);
                    await db.SaveChangesAsync();

                    return Results.Ok();
                });
        }
    }
}