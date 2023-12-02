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
using System.Text.Json;

namespace ProspectManagerWebApi.Enpoints
{
    public static class ContactEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/contacts", async (ProspectManagerDbContext db,
                                           IMapper mapper) =>
                await db.Contacts.Select(c => mapper.Map<ContactResponseDTO>(c)).ToListAsync());

            app.MapGet("/prospects/{idprospect:int}/contacts", [Authorize] async (int idprospect,
                                                               ProspectManagerDbContext db,
                                                               IMapper mapper) =>
            {
                var prospect = await db.Prospects.Include(p => p.Contacts).FirstOrDefaultAsync(p => p.Id == idprospect);
                return prospect?.Contacts.Select(c => mapper.Map<ContactResponseDTO>(c));
            });

            app.MapGet("/contacts/{idcontact:int}", [Authorize] async (int idcontact, ProspectManagerDbContext db, IMapper mapper) =>
                await db.Contacts.FirstOrDefaultAsync(c => c.Id == idcontact) is Contact contact ?
                Results.Ok(mapper.Map<ContactResponseDTO>(contact)) : Results.NotFound());

            app.MapPost("/prospects/{idprospect:int}/contacts/", [Authorize] async ([FromBody] Contact contact,
                                                                                    [FromRoute] int idProspect,
                                                                                    ProspectManagerDbContext db,
                                                                                    IMapper mapper) =>
            {
                var prospect = await db.Prospects.Include(p => p.Contacts).FirstOrDefaultAsync(p => p.Id == idProspect);
                if (prospect == null)
                    return Results.NotFound($"Aucun prospect trouvé avec l'ID {idProspect}.");

                prospect?.Contacts?.Add(contact);

                await db.SaveChangesAsync();
                return Results.Created($"/prospects/{idProspect}/contacts/{contact.Id}", mapper.Map<ContactResponseDTO>(contact));
            });

            app.MapPut("/contacts/{idcontact:int}", [Authorize] async ([FromBody] ContactRequestDTO updatedContact,
                                                                                  int idcontact,
                                                                                  ProspectManagerDbContext db,
                                                                                  UserService userService,
                                                                                  IMapper mapper) =>
            {
                var existingContact = await db.Contacts.FindAsync(idcontact);
                if (existingContact == null)
                    return Results.NotFound();

                var modifications = ModificationHelper.GetModifications(await userService.GetCurrentUser(), existingContact, updatedContact);

                modifications?.ForEach(m => existingContact.Modifications.Add(m));

                db.Entry(existingContact).CurrentValues.SetValues(updatedContact);
                await db.SaveChangesAsync();

                return Results.Ok(mapper.Map<ContactResponseDTO>(existingContact));
            });

            app.MapDelete("/contacts/{idContact:int}", [Authorize] async (int idContact, ProspectManagerDbContext db, UserService userService) =>
            {
                var existingContact = await db.Contacts
                                              .Include(c => c.Prospect)
                                              .FirstOrDefaultAsync(c => c.Id == idContact);

                if (existingContact == null)
                {
                    return Results.NotFound();
                }

                var nbEvenement = db.Evenements.Count(e => e.Contact.Id == idContact);

                if (nbEvenement > 0)
                {
                    existingContact.Actif = false;
                    existingContact.Modifications.Add(new Modification
                    {
                        AncienneValeur = $"Actif",
                        NouvelleValeur = "Desactivé (suite tentative de suppression)",
                        Champ = nameof(existingContact.Actif),
                        DateModification = DateTime.UtcNow,
                        Utilisateur = await userService.GetCurrentUser()
                    });
                }
                else
                {
                    existingContact.Prospect.Modifications.Add(new Modification
                    {
                        AncienneValeur = $"Contact {existingContact.Nom}",
                        NouvelleValeur = "Supprimé",
                        Champ = nameof(existingContact.Prospect.Contacts),
                        DateModification = DateTime.UtcNow,
                        Utilisateur = await userService.GetCurrentUser(),
                        JsonObjectBackup = JsonSerializer.Serialize(existingContact)
                    });

                    existingContact.Modifications.Clear();
                    db.Contacts.Remove(existingContact);
                }

                await db.SaveChangesAsync();

                return Results.Ok(new { Statut = nbEvenement == 0 ? "Deleted" : "Disabled" });
            });
        }
    }
}
