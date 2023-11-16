using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.Enpoints
{
    public static class StatutEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/statuts", [Authorize] async (ProspectManagerDbContext db) =>
    await db.Statuts.ToListAsync());

            app.MapPost("/statuts", [Authorize(Policy = "Admin")] async ([FromBody] Statut statut, ProspectManagerDbContext db) =>
            {
                db.Statuts.Add(statut);
                await db.SaveChangesAsync();

                return Results.Created($"/statuts/{statut.Id}", statut);
            });

            app.MapGet("/statuts/{idstatut:int}", [Authorize] async (int idStatut, ProspectManagerDbContext db) =>
                await db.Statuts.FindAsync(idStatut) is Statut statut ?
                Results.Ok(statut) : Results.NotFound());

            app.MapPut("/statuts/{idstatut:int}", [Authorize] async ([FromBody] Statut updatedStatut, int idStatut, ProspectManagerDbContext db) =>
            {
                if (idStatut != updatedStatut.Id)
                    return Results.BadRequest("Les identifiants ne sont pas cohérents.");

                var existingStatut = await db.Statuts.FindAsync(idStatut);
                if (existingStatut == null)
                    return Results.NotFound();

                db.Entry(existingStatut).CurrentValues.SetValues(updatedStatut);
                await db.SaveChangesAsync();

                return Results.Ok(existingStatut);
            });

            app.MapDelete("/statuts/{idstatut:int}", [Authorize(Policy = "Admin")] async (int idStatut, ProspectManagerDbContext db) =>
            {
                var existingStatut = await db.Statuts.FindAsync(idStatut);
                if (existingStatut == null)
                {
                    return Results.NotFound();
                }

                var nbProspect = db.Prospects.Count(e => e.Statut == existingStatut);

                if (nbProspect == 0)
                    db.Statuts.Remove(existingStatut);
                else
                    existingStatut.Actif = false;

                await db.SaveChangesAsync();

                return Results.Ok(new { Statut = nbProspect == 0 ? "Deleted" : "Disabled" });
            });
        }
    }
}
