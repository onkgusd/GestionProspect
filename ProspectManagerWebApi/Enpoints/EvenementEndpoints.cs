﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.DTO.Request;
using ProspectManagerWebApi.DTO.Response;
using ProspectManagerWebApi.Helpers;
using ProspectManagerWebApi.Models;
using ProspectManagerWebApi.Services;
using System.Text.Json;

namespace ProspectManagerWebApi.Enpoints
{
    public static class EvenementEndpoints
    {
        public static void Map(WebApplication app, IMapper mapper)
        {
            app.MapGet("/evenements", async (ProspectManagerDbContext db) =>
                await db.Evenements.ToListAsync());

            app.MapGet("/prospects/{idprospect:int}/evenements", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
                await db.Prospects.Where(p => p.Id == idprospect).Select(p => p.Evenements).ToListAsync());

            app.MapGet("/evenements/{idEvenement:int}", [Authorize] async (int idEvenement, ProspectManagerDbContext db) =>
                await db.Evenements
                    .Include(e => e.TypeEvenement)
                    .Include(e => e.Contact)
                    .Include(e => e.Produits)
                    .FirstOrDefaultAsync(e => e.Id == idEvenement) is Evenement evenement ?
                Results.Ok(mapper.Map<EvenementResponseDTO>(evenement)) : Results.NotFound());

            app.MapPost("/prospects/{idProspect:int}/evenements", [Authorize] async ([FromBody] EvenementRequestDTO evenement, int idProspect, ProspectManagerDbContext db, UserService userService) =>
            {
                var prospect = await db.Prospects.FirstOrDefaultAsync(p => p.Id == idProspect);
                if (prospect == null)
                    return Results.NotFound($"Aucun prospect trouvé avec l'ID {idProspect}.");

                var utilisateur = await userService.GetCurrentUser();
                var evenementEntity = mapper.Map<Evenement>(evenement);
                evenementEntity.Prospect = prospect;

                evenementEntity.Utilisateur = utilisateur;

                db.Evenements.Attach(evenementEntity);
                prospect.Modifications.Add(new Modification
                {
                    NouvelleValeur = $"Création de {evenement.TypeEvenement?.Libelle} du {evenement.DateEvenement.ToString("d")}",
                    DateModification = DateTimeOffset.UtcNow,
                    Champ = "Evenement",
                    Utilisateur = utilisateur
                });

                await db.SaveChangesAsync();
                return Results.Created($"/prospects/{idProspect}/evenements/{evenementEntity.Id}", mapper.Map<EvenementResponseDTO>(evenementEntity));
            });

            app.MapPut("/evenements/{idEvenement:int}", [Authorize]
            async (
                [FromBody] EvenementRequestDTO updatedEvenement,
                int idEvenement,
                ProspectManagerDbContext db,
                UserService userService) =>
            {
                var existingEvenement = await db.Evenements.Include(e => e.Produits)
                                                           .Include(e => e.Contact)
                                                           .Include(e => e.TypeEvenement)
                                                           .FirstAsync(e => e.Id == idEvenement);
                if (existingEvenement == null)
                    return Results.NotFound();

                var modifications = ModificationHelper.GetModifications(await userService.GetCurrentUser(), existingEvenement, updatedEvenement);

                modifications?.ForEach(m => existingEvenement.Modifications.Add(m));

                db.Entry(existingEvenement).CurrentValues.SetValues(updatedEvenement);
                existingEvenement.Produits = updatedEvenement.Produits?
                                                             .Select(p => db.Produits
                                                                            .FirstOrDefault(existing => existing.Id == p.Id) ?? p)
                                                             .ToList();

                if (existingEvenement.TypeEvenement?.Id != updatedEvenement.TypeEvenement?.Id)
                    existingEvenement.TypeEvenement = await db.TypesEvenement.FindAsync(updatedEvenement.TypeEvenement?.Id);

                if (existingEvenement.Contact?.Id != updatedEvenement.Contact?.Id)
                    existingEvenement.Contact = await db.Contacts.FindAsync(updatedEvenement.Contact?.Id) ?? throw new KeyNotFoundException("Le contact n'existe pas !");

                await db.SaveChangesAsync();

                return Results.Ok(mapper.Map<EvenementResponseDTO>(existingEvenement));
            });

            app.MapDelete("/evenements/{idEvenement:int}", [Authorize]
            async (int idEvenement,
                                                                              ProspectManagerDbContext db,
                                                                              UserService userService) =>
            {
                var existingEvenement = await db.Evenements
                                                .Include(e => e.Modifications)
                                                .Include(e => e.Prospect)
                                                .Include(e => e.TypeEvenement)
                                                .FirstOrDefaultAsync(e => e.Id == idEvenement);

                if (existingEvenement == null)
                {
                    return Results.NotFound();
                }

                existingEvenement.Prospect.Modifications.Add(
                    new Modification
                    {
                        AncienneValeur = $"{existingEvenement.TypeEvenement?.Libelle} du {existingEvenement.DateEvenement.ToString("dd/MM/yyyy")}",
                        Champ = "Evénements",
                        NouvelleValeur = "Evénenement supprimé",
                        DateModification = DateTime.UtcNow,
                        Utilisateur = await userService.GetCurrentUser(),
                        JsonObjectBackup = JsonSerializer.Serialize(existingEvenement)
                    });

                existingEvenement.Modifications.Clear();

                db.Evenements.Remove(existingEvenement);
                await db.SaveChangesAsync();

                return Results.Ok();
            });
        }
    }
}
