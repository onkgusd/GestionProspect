using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.Enpoints
{
    public static class TypeOrganismeEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/types-organisme", [Authorize] async (ProspectManagerDbContext db) =>
    await db.TypesOrganisme.ToListAsync());

            app.MapGet("/types-organisme/{idtypeorganisme:int}", [Authorize] async (int idTypeOrganisme, ProspectManagerDbContext db) =>
                await db.TypesOrganisme.FindAsync(idTypeOrganisme) is TypeOrganisme typeOrganisme ?
                Results.Ok(typeOrganisme) : Results.NotFound());

            app.MapPost("/types-organisme", [Authorize(Policy = "Admin")] async ([FromBody] TypeOrganisme typeOrganisme, ProspectManagerDbContext db) =>
            {
                db.TypesOrganisme.Add(typeOrganisme);
                await db.SaveChangesAsync();

                return Results.Created($"/produits/{typeOrganisme.Id}", typeOrganisme);
            });

            app.MapPut("/types-organisme/{idtypeorganisme:int}", [Authorize(Policy = "Admin")] async ([FromBody] TypeOrganisme updatedTypeOrganisme, int idTypeOrganisme, ProspectManagerDbContext db) =>
            {
                if (idTypeOrganisme != updatedTypeOrganisme.Id)
                    return Results.BadRequest("Les identifiants ne sont pas cohérents.");

                var existingTypeOrganisme = await db.TypesOrganisme.FindAsync(idTypeOrganisme);
                if (existingTypeOrganisme == null)
                    return Results.NotFound();

                db.Entry(existingTypeOrganisme).CurrentValues.SetValues(updatedTypeOrganisme);
                await db.SaveChangesAsync();

                return Results.Ok(existingTypeOrganisme);
            });

            app.MapDelete("/types-organisme/{idtypeorganisme:int}", [Authorize(Policy = "Admin")] async (int idTypeOrganisme, ProspectManagerDbContext db) =>
            {
                var existingTypeOrganisme = await db.TypesOrganisme.FindAsync(idTypeOrganisme);
                if (existingTypeOrganisme == null)
                {
                    return Results.NotFound();
                }

                var nbOrganisme = db.Prospects.Count(e => e.TypeOrganisme == existingTypeOrganisme);

                if (nbOrganisme == 0)
                    db.TypesOrganisme.Remove(existingTypeOrganisme);
                else
                    existingTypeOrganisme.Actif = false;

                await db.SaveChangesAsync();

                return Results.Ok(new { Statut = nbOrganisme == 0 ? "Deleted" : "Disabled" });
            });
        }
    }
}
