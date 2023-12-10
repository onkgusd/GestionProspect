using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.Enpoints
{
    public static class SecteurGeographiqueEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/secteurs-geographiques", [Authorize] async (ProspectManagerDbContext db) =>
    await db.SecteursGeographiques.ToListAsync());

            app.MapGet("/secteurs-geographiques/{idsecteurgeographique:int}", [Authorize] async (int idSecteurGeographique, ProspectManagerDbContext db) =>
                await db.SecteursGeographiques.FindAsync(idSecteurGeographique) is SecteurGeographique secteurGeographique ?
                Results.Ok(secteurGeographique) : Results.NotFound());

            app.MapPost("/secteurs-geographiques", [Authorize(Policy = "Admin")] async ([FromBody] SecteurGeographique secteurGeographique, ProspectManagerDbContext db) =>
            {
                db.SecteursGeographiques.Add(secteurGeographique);
                await db.SaveChangesAsync();

                return Results.Created($"/secteurs-geographiques/{secteurGeographique.Id}", secteurGeographique);
            });

            app.MapPut("/secteurs-geographiques/{idsecteurgeographique:int}", [Authorize(Policy = "Admin")] async ([FromBody] SecteurGeographique updatedSecteurGeographique, int idSecteurGeographique, ProspectManagerDbContext db) =>
            {
                if (idSecteurGeographique != updatedSecteurGeographique.Id)
                    return Results.BadRequest("Les identifiants ne sont pas cohérents.");

                var existingSecteurGeographique = await db.SecteursGeographiques.FindAsync(idSecteurGeographique);
                if (existingSecteurGeographique == null)
                    return Results.NotFound();

                db.Entry(existingSecteurGeographique).CurrentValues.SetValues(updatedSecteurGeographique);
                await db.SaveChangesAsync();

                return Results.Ok(existingSecteurGeographique);
            });

            app.MapDelete("/secteurs-geographiques/{idsecteurgeographique:int}", [Authorize(Policy = "Admin")] async (int idSecteurGeographique, ProspectManagerDbContext db) =>
            {
                var existingSecteurGeographique = await db.SecteursGeographiques.FindAsync(idSecteurGeographique);
                if (existingSecteurGeographique == null)
                {
                    return Results.NotFound();
                }

                var nbOrganisme = db.Prospects.Count(e => e.SecteurGeographique == existingSecteurGeographique);

                if (nbOrganisme == 0)
                    db.SecteursGeographiques.Remove(existingSecteurGeographique);
                else
                    existingSecteurGeographique.Actif = false;

                await db.SaveChangesAsync();

                return Results.Ok(new { Statut = nbOrganisme == 0 ? "Deleted" : "Disabled" });
            });
        }
    }
}
