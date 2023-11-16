using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.Enpoints
{
    public static class ContactEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/contacts", async (ProspectManagerDbContext db) =>
                await db.Contacts.ToListAsync());

            app.MapGet("/prospects/{idprospect:int}/contacts", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
            {
                var prospect = await db.Prospects.Include(p => p.Contacts).FirstOrDefaultAsync(p => p.Id == idprospect);
                return prospect?.Contacts;
            });

            app.MapGet("/contacts/{idcontact:int}", [Authorize] async (int idcontact, ProspectManagerDbContext db) =>
                await db.Contacts.FirstOrDefaultAsync(c => c.Id == idcontact) is Contact contact ?
                Results.Ok(contact) : Results.NotFound());

            app.MapPost("/prospects/{idprospect:int}/contacts/", [Authorize] async ([FromBody] Contact contact, [FromRoute] int idProspect, ProspectManagerDbContext db) =>
            {
                var prospect = await db.Prospects.Include(p => p.Contacts).FirstOrDefaultAsync(p => p.Id == idProspect);
                if (prospect == null)
                    return Results.NotFound($"Aucun prospect trouvé avec l'ID {idProspect}.");

                prospect?.Contacts?.Add(contact);

                await db.SaveChangesAsync();
                return Results.Created($"/prospects/{idProspect}/contacts/{contact.Id}", contact);
            });

            app.MapPut("/contacts/{idcontact:int}", [Authorize] async ([FromBody] Contact updatedContact, int idcontact, ProspectManagerDbContext db) =>
            {
                if (idcontact != updatedContact.Id)
                    return Results.BadRequest("Les identifiants de contact ne sont pas cohérents.");

                var existingContact = await db.Contacts.FindAsync(idcontact);
                if (existingContact == null)
                    return Results.NotFound();

                db.Entry(existingContact).CurrentValues.SetValues(updatedContact);
                await db.SaveChangesAsync();

                return Results.Ok(existingContact);
            });

            app.MapDelete("/contacts/{idContact:int}", [Authorize] async (int idContact, ProspectManagerDbContext db) =>
            {
                var existingContact = await db.Contacts.FindAsync(idContact);
                if (existingContact == null)
                {
                    return Results.NotFound();
                }

                db.Contacts.Remove(existingContact);
                await db.SaveChangesAsync();

                return Results.Ok();
            });
        }
    }
}
