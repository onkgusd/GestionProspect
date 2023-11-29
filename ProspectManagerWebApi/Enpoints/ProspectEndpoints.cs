using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.DTO.Request;
using ProspectManagerWebApi.DTO.Response;
using ProspectManagerWebApi.Helpers;
using ProspectManagerWebApi.Models;
using ProspectManagerWebApi.Services;
using System.Reflection.Metadata.Ecma335;

namespace ProspectManagerWebApi.Enpoints
{
    public class ProspectEndpoints
    {
        public static void Map(WebApplication app, IMapper mapper)
        {
            app.MapGet("/prospects", async (ProspectManagerDbContext db) =>
                await db.Prospects.Include(p => p.TypeOrganisme)
                                  .Include(p => p.Statut)
                                  .Include(p => p.Contacts)
                                  .Include(p => p.ProduitProspects)
                                    .ThenInclude(pp => pp.Produit)
                                  .Select(p => mapper.Map<ProspectResponseDTO>(p)).ToListAsync());

            app.MapGet("/prospects/{idprospect:int}", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
            {
                var prospect = await db.Prospects.Include(p => p.Contacts)
                                    .ThenInclude(c => c.Modifications)
                               .Include(p => p.Statut)
                               .Include(p => p.ProduitProspects)
                                   .ThenInclude(pp => pp.Produit)
                               .Include(p => p.ProduitProspects)
                                   .ThenInclude(pp => pp.Modifications)
                               .Include(p => p.Evenements)
                                   .ThenInclude(e => e.TypeEvenement)
                               .Include(p => p.Evenements)
                                   .ThenInclude(e => e.Contact)
                               .Include(p => p.Evenements)
                                   .ThenInclude(e => e.Produits)
                               .Include(p => p.Evenements)
                                   .ThenInclude(e => e.Modifications)
                               .Include(p => p.Evenements)
                                   .ThenInclude(e => e.Utilisateur)
                               .Include(p => p.UtilisateurCreation)
                               .Include(p => p.TypeOrganisme)
                               .Include(p => p.Modifications)
                               .FirstOrDefaultAsync(p => p.Id == idprospect);

                if (prospect == null) return Results.NotFound();

                return Results.Ok(mapper.Map<ProspectResponseDTO>(prospect));
            });

            app.MapGet("/prospects/{idprospect:int}/modifications", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
            {
                var prospect = await db.Prospects.Include(p => p.Modifications)
                                .ThenInclude(m => m.Utilisateur)
                                .Include(p => p.Contacts)
                                    .ThenInclude(c => c.Modifications)
                                    .ThenInclude(m => m.Utilisateur)
                               .Include(p => p.ProduitProspects)
                                   .ThenInclude(pp => pp.Modifications)
                                   .ThenInclude(m => m.Utilisateur)
                               .Include(p => p.Evenements)
                                   .ThenInclude(e => e.Modifications)
                                   .ThenInclude(m => m.Utilisateur)
                               .Include(p => p.Evenements)
                                   .ThenInclude(e => e.TypeEvenement)
                               .FirstOrDefaultAsync(p => p.Id == idprospect);

                if (prospect == null) return Results.NotFound();

                var modifications = prospect.Modifications
                    .Select(m => mapper.Map<Modification, ModificationResponseDTO>(m, opt =>
                        opt.AfterMap((src, dest) => dest.Libelle = "Changement sur le prospect")))
                    .Concat(prospect.Contacts.SelectMany(c => c.Modifications.Select(m => new { Modification = m, Contact = c })
                        .Select(x => mapper.Map<Modification, ModificationResponseDTO>(x.Modification, opt =>
                            opt.AfterMap((src, dest) => dest.Libelle = $"Changement sur le contact {x.Contact.Nom}")))))
                    .Concat(prospect.Evenements.SelectMany(e => e.Modifications.Select(m => new { Modification = m, Evenement = e })
                        .Select(x => mapper.Map<Modification, ModificationResponseDTO>(x.Modification, opt =>
                            opt.AfterMap((src, dest) => dest.Libelle = $"Changement sur l'événement {x.Evenement.TypeEvenement?.Libelle} du {x.Evenement.DateEvenement:dd/MM/yyyy}")))))
                    .Concat(prospect.ProduitProspects.SelectMany(pp => pp.Modifications.Select(m => new { Modification = m, Produit = pp.Produit })
                        .Select(x => mapper.Map<Modification, ModificationResponseDTO>(x.Modification, opt =>
                            opt.AfterMap((src, dest) => dest.Libelle = $"Changement sur le produit associé {x.Produit.Libelle}")))))
                    .Concat(new[] {
                        new ModificationResponseDTO {
                            DateModification = prospect.DateCreation,
                            Champ = "Tous les champs",
                            AncienneValeur = "Aucune",
                            NouvelleValeur = "Fiche créée",
                            Utilisateur = mapper.Map<UtilisateurResponseDTO>(prospect.UtilisateurCreation),
                            Libelle = "Création du prospect"
                        }
                    })
                    .OrderByDescending(m => m.DateModification)
                    .ToList();


                return Results.Ok(modifications);
            });

            app.MapPost("/prospects/", [Authorize] async ([FromBody] ProspectRequestDTO prospectRequest,
                ProspectManagerDbContext db,
                UserService userService) =>
            {
                var prospect = mapper.Map<Prospect>(prospectRequest);
                prospect.DateCreation = DateTime.UtcNow;

                var utilisateur = await userService.GetCurrentUser();

                if (utilisateur == null)
                    return Results.Unauthorized();

                prospect.UtilisateurCreation = utilisateur;

                db.Prospects.Attach(prospect);
                await db.SaveChangesAsync();

                return Results.Created($"/prospects/{prospect.Id}", prospect);
            });

            app.MapPut("/prospects/{idprospect:int}", [Authorize] async (
                [FromBody] ProspectRequestDTO updatedProspect,
                int idProspect,
                ProspectManagerDbContext db,
                UserService userService) =>
            {
                var existingProspect = await db.Prospects.Include(p => p.Statut)
                                                         .Include(p => p.TypeOrganisme)
                                                         .FirstAsync(p => p.Id == idProspect);

                if (existingProspect == null)
                    return Results.NotFound();

                var modifications = ModificationHelper.GetModifications(await userService.GetCurrentUser(), existingProspect, updatedProspect);

                modifications?.ForEach(m => existingProspect.Modifications.Add(m));

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
                var produit = db.Produits.Find(idProduit);
                var prospect = db.Prospects.Find(idProspect);

                if (produit == null || prospect == null) return Results.BadRequest();

                db.ProduitProspect.Add(new ProduitProspect()
                {
                    Produit = produit,
                    Prospect = prospect,
                    ProbabiliteSucces = produitProspect.ProbabiliteSucces
                });

                await db.SaveChangesAsync();

                return Results.Created($"/prospects/{idProspect}/produits/{idProduit}", produitProspect);
            });

            app.MapPut("/prospects/{idprospect:int}/produits/{idproduit:int}",
                [Authorize] async ([FromBody] ProduitProspectRequestDTO produitProspect,
                [FromRoute] int idProspect,
                [FromRoute] int idProduit,
                ProspectManagerDbContext db,
                UserService userService) =>
                {
                    var existingProduitProspect = await db.ProduitProspect
                                                          .FirstAsync(p => p.Prospect.Id == idProspect
                                                                      && p.Produit.Id == idProduit);

                    if (existingProduitProspect == null)
                        return Results.NotFound();

                    var produit = db.Produits.Find(idProduit);
                    var prospect = db.Prospects.Find(idProspect);

                    if (produit == null || prospect == null) return Results.BadRequest();

                    if (existingProduitProspect.ProbabiliteSucces != produitProspect.ProbabiliteSucces)
                    {
                        existingProduitProspect.Modifications.Add(new Modification
                        {
                            AncienneValeur = existingProduitProspect.ProbabiliteSucces.ToString(),
                            NouvelleValeur = produitProspect.ProbabiliteSucces.ToString(),
                            Champ = nameof(produitProspect.ProbabiliteSucces),
                            DateModification = DateTime.UtcNow,
                            Utilisateur = await userService.GetCurrentUser()
                        });

                        existingProduitProspect.ProbabiliteSucces = produitProspect.ProbabiliteSucces;

                        await db.SaveChangesAsync();
                    }

                    return Results.Ok(produitProspect);
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

            app.MapDelete("/prospects/{idprospect:int}/produits/{idproduit:int}",
                [Authorize] async (
                [FromRoute] int idProspect,
                [FromRoute] int idProduit,
                ProspectManagerDbContext db,
                UserService userService) =>
                {
                    var existingProduitProspect = await db.ProduitProspect.Include(p => p.Prospect)
                                                                          .Include(p => p.Produit)
                                                                          .Where(pp => pp.Produit.Id == idProduit
                                                                                && pp.Prospect.Id == idProspect).FirstOrDefaultAsync();
                    if (existingProduitProspect == null)
                    {
                        return Results.NotFound();
                    }

                    existingProduitProspect.Prospect.Modifications.Add(new Modification
                    {
                        AncienneValeur = $"Produit {existingProduitProspect.Produit.Libelle} (probabilité : {existingProduitProspect.ProbabiliteSucces})",
                        NouvelleValeur = "Supprimé",
                        Champ = nameof(existingProduitProspect.ProbabiliteSucces),
                        DateModification = DateTime.UtcNow,
                        Utilisateur = await userService.GetCurrentUser()
                    });

                    existingProduitProspect.Modifications.Clear();

                    db.ProduitProspect.Remove(existingProduitProspect);
                    await db.SaveChangesAsync();

                    return Results.Ok();
                });
        }
    }
}