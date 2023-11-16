using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.Enpoints
{
    public static class TypeEvenementEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/types-evenement", [Authorize] async (ProspectManagerDbContext db) =>
    await db.TypesEvenement.ToListAsync());

            app.MapGet("/types-evenement/{idtypeevenement:int}", [Authorize] async (int idTypeEvenement, ProspectManagerDbContext db) =>
                await db.TypesEvenement.FindAsync(idTypeEvenement) is TypeEvenement typeEvenement ?
                Results.Ok(typeEvenement) : Results.NotFound());

            app.MapPost("/types-evenement", [Authorize(Policy = "Admin")] async ([FromBody] TypeEvenement typeEvenement, ProspectManagerDbContext db) =>
            {
                db.TypesEvenement.Add(typeEvenement);
                await db.SaveChangesAsync();

                return Results.Created($"/produits/{typeEvenement.Id}", typeEvenement);
            });

            app.MapPut("/types-evenement/{idtypeevenement:int}", [Authorize(Policy = "Admin")] async ([FromBody] TypeEvenement updatedTypeEvenement, int idTypeEvenement, ProspectManagerDbContext db) =>
            {
                if (idTypeEvenement != updatedTypeEvenement.Id)
                    return Results.BadRequest("Les identifiants ne sont pas cohérents.");

                var existingTypeEvenement = await db.TypesEvenement.FindAsync(idTypeEvenement);
                if (existingTypeEvenement == null)
                    return Results.NotFound();

                db.Entry(existingTypeEvenement).CurrentValues.SetValues(updatedTypeEvenement);
                await db.SaveChangesAsync();

                return Results.Ok(existingTypeEvenement);
            });

            app.MapDelete("/types-evenement/{idtypeevenement:int}", [Authorize(Policy = "Admin")] async (int idTypeEvenement, ProspectManagerDbContext db) =>
            {
                var existingTypeEvenement = await db.TypesEvenement.FindAsync(idTypeEvenement);
                if (existingTypeEvenement == null)
                {
                    return Results.NotFound();
                }

                var nbEvenement = db.Evenements.Count(e => e.TypeEvenement == existingTypeEvenement);

                if (nbEvenement == 0)
                    db.TypesEvenement.Remove(existingTypeEvenement);
                else
                    existingTypeEvenement.Actif = false;

                await db.SaveChangesAsync();

                return Results.Ok(new { Statut = nbEvenement == 0 ? "Deleted" : "Disabled" });
            });
        }
    }
}
