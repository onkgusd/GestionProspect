using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.DTO.Response;
using ProspectManagerWebApi.Models;

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

            app.MapPost("/prospects/{idProspect:int}/evenements", [Authorize] async ([FromBody] Evenement evenement, int idProspect, ProspectManagerDbContext db) =>
            {
                var prospect = await db.Prospects.Include(p => p.Evenements).FirstOrDefaultAsync(p => p.Id == idProspect);
                if (prospect == null)
                    return Results.NotFound($"Aucun prospect trouvé avec l'ID {idProspect}.");

                prospect.Evenements?.Add(evenement);

                await db.SaveChangesAsync();
                return Results.Created($"/prospects/{idProspect}/evenements/{evenement.Id}", mapper.Map<EvenementResponseDTO>(evenement));
            });

            app.MapPut("/evenements/{idEvenement:int}", [Authorize] async ([FromBody] Evenement updatedEvenement, int idEvenement, ProspectManagerDbContext db) =>
            {
                if (idEvenement != updatedEvenement.Id)
                    return Results.BadRequest("Les identifiants d'événement ne sont pas cohérents.");

                var existingEvenement = await db.Evenements.Include(e => e.Produits).FirstAsync(e => e.Id == idEvenement);
                if (existingEvenement == null)
                    return Results.NotFound();

                db.Entry(existingEvenement).CurrentValues.SetValues(updatedEvenement);
                existingEvenement.Produits = updatedEvenement.Produits?
                .Select(p => db.Produits.FirstOrDefault(existing => existing.Id == p.Id) ?? p)
                .ToList();

                await db.SaveChangesAsync();

                return Results.Ok(mapper.Map<EvenementResponseDTO>(existingEvenement));
            });

            app.MapDelete("/evenements/{idEvenement:int}", [Authorize] async (int idEvenement, ProspectManagerDbContext db) =>
            {
                var existingEvenement = await db.Evenements.FindAsync(idEvenement);
                if (existingEvenement == null)
                {
                    return Results.NotFound();
                }

                db.Evenements.Remove(existingEvenement);
                await db.SaveChangesAsync();

                return Results.Ok();
            });
        }
    }
}
