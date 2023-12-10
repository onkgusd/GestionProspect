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

namespace ProspectManagerWebApi.Enpoints
{
    public static class UtilisateurEndpoints
    {
        public static void Map(WebApplication app, IMapper mapper)
        {
            app.MapGet("/utilisateurs", [Authorize(Policy = "Admin")] async (ProspectManagerDbContext db) =>
    await db.Utilisateurs.Select(u => mapper.Map<UtilisateurResponseDTO>(u)).ToListAsync());

            app.MapGet("/utilisateurs/{idutilisateur:int}", [Authorize(Policy = "Admin")] async (int idUtilisateur, ProspectManagerDbContext db) =>
                await db.Utilisateurs.FindAsync(idUtilisateur) is Utilisateur utilisateur ?
                Results.Ok(mapper.Map<UtilisateurResponseDTO>(utilisateur)) : Results.NotFound());

            app.MapPost("/utilisateurs", [Authorize(Policy = "Admin")] async ([FromBody] UtilisateurRequestDTO utilisateur,
                                                                                ProspectManagerDbContext db,
                                                                                PasswordManagerService passwordManagerService) =>
            {
                var utilisateurEntity = mapper.Map<Utilisateur>(utilisateur);

                db.Utilisateurs.Add(utilisateurEntity);

                await db.SaveChangesAsync();

                await passwordManagerService.SendInvitationEmail(utilisateurEntity);

                return Results.Created($"/utilisateurs/{utilisateurEntity.Id}", mapper.Map<UtilisateurResponseDTO>(utilisateurEntity));
            });

            app.MapPut("/utilisateurs/{idutilisateur:int}", [Authorize(Policy = "Admin")] async ([FromBody] UtilisateurRequestDTO updatedUtilisateur, int idUtilisateur, ProspectManagerDbContext db) =>
            {
                var existingUtilisateur = await db.Utilisateurs.FindAsync(idUtilisateur);
                if (existingUtilisateur == null)
                    return Results.NotFound();

                db.Entry(existingUtilisateur).CurrentValues.SetValues(updatedUtilisateur);

                if (!string.IsNullOrEmpty(updatedUtilisateur.MotDePasse))
                {
                    existingUtilisateur.Empreinte = PasswordHelper.HashPassword(updatedUtilisateur.MotDePasse);
                    existingUtilisateur.DateModificationMotDePasse = DateTime.UtcNow;
                }

                await db.SaveChangesAsync();

                return Results.Ok(mapper.Map<UtilisateurResponseDTO>(existingUtilisateur));
            });

            app.MapDelete("/utilisateurs/{idutilisateur:int}", [Authorize(Policy = "Admin")] async (int idUtilisateur, ProspectManagerDbContext db) =>
            {
                var existingUtilisateur = await db.Utilisateurs
                                                    .Include(u => u.PasswordResetTokens)
                                                    .FirstOrDefaultAsync(u => u.Id == idUtilisateur);
                if (existingUtilisateur == null)
                {
                    return Results.NotFound();
                }

                var nbProspect = db.Prospects.Count(p => p.UtilisateurCreation == existingUtilisateur);
                var nbEvenement = db.Evenements.Count(e => e.Utilisateur == existingUtilisateur);
                var nbModification = db.Modifications.Count(m => m.Utilisateur == existingUtilisateur);

                if (nbEvenement + nbProspect + nbModification == 0)
                {
                    existingUtilisateur.PasswordResetTokens?.Clear();
                    db.Utilisateurs.Remove(existingUtilisateur);
                }
                else
                {
                    existingUtilisateur.Actif = false;
                }

                await db.SaveChangesAsync();

                return Results.Ok(new { Statut = nbEvenement + nbProspect + nbModification == 0 ? "Deleted" : "Disabled" });
            });
        }
    }
}
