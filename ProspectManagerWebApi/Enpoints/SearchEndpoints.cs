using LinqKit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.DTO.Request;
using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.Enpoints
{
    public static class SearchEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapPost("/prospects/search", [Authorize] async ([FromBody] ProspectSearchRequestDTO prospectSearch,
                                                                                ProspectManagerDbContext db) =>
            {
                var prospects = db.Prospects.Include(p => p.Statut)
                                            .Include(p => p.TypeOrganisme)
                                            .AsQueryable();

                if (prospectSearch.Noms?.Length > 0)
                {
                    var predicate = PredicateBuilder.New<Prospect>(false);

                    foreach (var nom in prospectSearch.Noms)
                    {
                        predicate = predicate.Or(p => p.Nom.Contains(nom));
                    }

                    prospects = prospects.Where(predicate);
                }

                if (prospectSearch.Statuts?.Length > 0)
                {
                    var statutPredicate = PredicateBuilder.New<Prospect>(false);
                    foreach (var statut in prospectSearch.Statuts)
                    {
                        int tempStatutId = statut.Id; // Variable temporaire pour éviter la fermeture sur la variable de boucle
                        statutPredicate = statutPredicate.Or(p => p.Statut.Id == tempStatutId);
                    }
                    prospects = prospects.Where(statutPredicate);
                }

                if (prospectSearch.TypesOrganisme?.Length > 0)
                {
                    var typeOrganismePredicate = PredicateBuilder.New<Prospect>(false);
                    foreach (var typeOrganisme in prospectSearch.TypesOrganisme)
                    {
                        int tempTypeOrganismeId = typeOrganisme.Id;
                        typeOrganismePredicate = typeOrganismePredicate.Or(p => p.TypeOrganisme.Id == tempTypeOrganismeId);
                    }
                    prospects = prospects.Where(typeOrganismePredicate);
                }

                if (prospectSearch.Produits?.Length > 0)
                {
                    var produitPredicate = PredicateBuilder.New<Prospect>(false);
                    foreach (var produit in prospectSearch.Produits)
                    {
                        int tempProduitId = produit.Id;
                        produitPredicate = produitPredicate.Or(p => p.ProduitProspects.Any(pp => pp.Produit.Id == tempProduitId));
                    }
                    prospects = prospects.Where(produitPredicate);
                }

                if (prospectSearch.SecteursActivite?.Length > 0)
                {
                    var predicate = PredicateBuilder.New<Prospect>(false);

                    foreach (var secteurActivite in prospectSearch.SecteursActivite)
                    {
                        predicate = predicate.Or(p => p.SecteurActivite != null
                                                      && p.SecteurActivite.Contains(secteurActivite));
                    }

                    prospects = prospects.Where(predicate);
                }

                if (prospectSearch.Departements?.Length > 0)
                {
                    var predicate = PredicateBuilder.New<Prospect>(false);

                    foreach (var secteurGeographique in prospectSearch.Departements)
                    {
                        predicate = predicate.Or(p => p.Departement != null
                                                      && p.Departement.Contains(secteurGeographique));
                    }

                    prospects = prospects.Where(predicate);
                }

                return Results.Ok(await prospects.ToListAsync());
            });
        }
    }
}
