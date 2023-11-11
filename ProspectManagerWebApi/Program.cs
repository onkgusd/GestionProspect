using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.DTO.Request;
using ProspectManagerWebApi.DTO.Response;
using ProspectManagerWebApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Add services to the container.
builder.Services.AddDbContext<ProspectManagerDbContext>();

// Configuration de l'authentification JWT
builder.Services.AddAuthentication(o =>
{
    o.DefaultAuthenticateScheme = JwtBearerDefaults.
AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.
AuthenticationScheme;
    o.DefaultScheme = JwtBearerDefaults.
AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey
(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new Exception("Jwt key is not set.")))
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin",
         policy => policy.RequireRole("Admin"));
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
});

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile()); // Votre classe de profil de mappage
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

#region Authentification
app.MapPost("/authentication/getToken",
[AllowAnonymous] async (LoginRequestDTO user, ProspectManagerDbContext db) =>
{
    var utilisateur = db.Utilisateurs.First(u => u.Login == user.Login);

    if (utilisateur == null)
        return Results.Unauthorized();

    var issuer = builder.Configuration["Jwt:Issuer"];
    var audience = builder.Configuration["Jwt:Audience"];
    var securityKey = new SymmetricSecurityKey
(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new Exception("Jwt key is not set.")));
    var credentials = new SigningCredentials(securityKey,
SecurityAlgorithms.HmacSha512);

    var expirationDate = DateTime.UtcNow.AddHours(24);
    var token = new JwtSecurityToken(issuer: issuer,
        audience: audience,
        signingCredentials: credentials,
        claims: new[]
            {
            new Claim(ClaimTypes.Name, utilisateur.Login),
            new Claim(ClaimTypes.Role, utilisateur.Role)
        },
        expires: expirationDate);

    var tokenHandler = new JwtSecurityTokenHandler();
    var stringToken = tokenHandler.WriteToken(token);

    return Results.Ok(new LoginResponseDTO() { Token = stringToken, ExpirationDate = expirationDate });
});
#endregion

#region Gestion des produits
app.MapGet("/produits", [Authorize] async (ProspectManagerDbContext db) =>
    await db.Produits.ToListAsync());

app.MapGet("/produits/{idproduit:int}", [Authorize] async (int idProduit, ProspectManagerDbContext db) =>
    await db.Produits.FindAsync(idProduit) is Produit produit ?
    Results.Ok(produit) : Results.NotFound());

app.MapPost("/produits", [Authorize(Policy = "Admin")] async ([FromBody] Produit produit, ProspectManagerDbContext db) =>
{
    db.Produits.Add(produit);
    await db.SaveChangesAsync();

    return Results.Created($"/produits/{produit.Id}", produit);
});

app.MapPut("/produits/{idproduit:int}", [Authorize] async ([FromBody] Produit updatedProduit, int idProduit, ProspectManagerDbContext db) =>
{
    if (idProduit != updatedProduit.Id)
        return Results.BadRequest("Les identifiants produits ne sont pas cohérents.");

    var existingProduit = await db.Produits.FindAsync(idProduit);
    if (existingProduit == null)
        return Results.NotFound();

    db.Entry(existingProduit).CurrentValues.SetValues(updatedProduit);
    await db.SaveChangesAsync();

    return Results.Ok(existingProduit);
});

app.MapDelete("/produits/{idproduit:int}", [Authorize(Policy = "Admin")] async (int idProduit, ProspectManagerDbContext db) =>
{
    var existingProduit = await db.Produits.FindAsync(idProduit);
    if (existingProduit == null)
    {
        return Results.NotFound();
    }

    db.Produits.Remove(existingProduit);
    await db.SaveChangesAsync();

    return Results.Ok();
});

#endregion

#region Gestion des prospects
app.MapGet("/prospects", async (ProspectManagerDbContext db) =>
    await db.Prospects.Include(p => p.Statut).ToListAsync());

app.MapGet("/prospects/{idprospect:int}", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
await db.Prospects
    .Include(p => p.Contacts)
    .Include(p => p.Statut)
    .Include(p => p.ProduitProspects)
        .ThenInclude(pp => pp.Produit)
    .Include(p => p.Evenements)
        .ThenInclude(e => e.TypeEvenement)
    .Include(p => p.Evenements)
        .ThenInclude(e => e.Contact)
    .Include(p => p.Evenements)
        .ThenInclude(e => e.Produits)
    .FirstOrDefaultAsync(p => p.Id == idprospect) is Prospect prospect ?
Results.Ok(mapper.Map<ProspectResponseDTO>(prospect)) : Results.NotFound());

app.MapPost("/prospects/", [Authorize] async ([FromBody] Prospect prospect, ProspectManagerDbContext db) =>
{
    prospect.DateCreation = DateTime.UtcNow;
    db.Prospects.Attach(prospect);
    await db.SaveChangesAsync();

    return Results.Created($"/prospects/{prospect.Id}", prospect);
});

app.MapPut("/prospects/{idprospect:int}", [Authorize] async ([FromBody] Prospect updatedProspect, int idProspect, ProspectManagerDbContext db) =>
{
    if (idProspect != updatedProspect.Id)
        return Results.BadRequest("Les identifiants produits ne sont pas cohérents.");

    var existingProspect = await db.Prospects.Include(p => p.Statut).FirstAsync(p => p.Id == idProspect);

    if (existingProspect == null)
        return Results.NotFound();

    db.Entry(existingProspect).CurrentValues.SetValues(updatedProspect);
    existingProspect.Statut = updatedProspect.Statut;

    await db.SaveChangesAsync();

    return Results.Ok(existingProspect);
});

app.MapGet("/prospects/{idprospect:int}/produits", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
    await db.ProduitProspect
        .Where(pp => pp.Prospect.Id == idprospect)
        .Include(pp => pp.Produit)
        .ToArrayAsync() is ProduitProspect[] produitProspects ?
    Results.Ok(produitProspects) : Results.NotFound());

app.MapPost("/prospects/{idprospect:int}/produits/{idproduit:int}", [Authorize] async ([FromBody] ProduitProspectRequestDTO produitProspect, [FromRoute] int idProspect, [FromRoute] int idProduit, ProspectManagerDbContext db) =>
{
    db.ProduitProspect.Add(new ProduitProspect()
    {
        Produit = db.Produits.Find(idProduit),
        Prospect = db.Prospects.Find(idProspect),
        ProbabiliteSucces = produitProspect.ProbabiliteSucces
    });

    await db.SaveChangesAsync();

    return Results.Created($"/prospects/{idProspect}/produits/{idProduit}", produitProspect);
});

app.MapPut("/prospects/{idprospect:int}/produits/{idproduit:int}",
    [Authorize] async ([FromBody] ProduitProspectRequestDTO produitProspect,
    [FromRoute] int idProspect,
    [FromRoute] int idProduit,
    ProspectManagerDbContext db) =>
{
    var existingProduitProspect = await db.ProduitProspect.FirstAsync(p => p.Prospect.Id == idProspect
                                                                            && p.Produit.Id == idProduit);

    if (existingProduitProspect == null)
        return Results.NotFound();

    existingProduitProspect.ProbabiliteSucces = produitProspect.ProbabiliteSucces;

    await db.SaveChangesAsync();

    return Results.Ok(existingProduitProspect);
});

app.MapDelete("/prospects/{idprospect:int}/produits/{idproduit:int}",
    [Authorize] async (
    [FromRoute] int idProspect,
    [FromRoute] int idProduit,
    ProspectManagerDbContext db) =>
{
    var existingProduitProspect = await db.ProduitProspect.Where(pp => pp.Produit.Id == idProduit
                                                                    && pp.Prospect.Id == idProspect).FirstOrDefaultAsync();
    if (existingProduitProspect == null)
    {
        return Results.NotFound();
    }

    db.ProduitProspect.Remove(existingProduitProspect);
    await db.SaveChangesAsync();

    return Results.Ok();
});
#endregion

#region Gestion des contacts
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

    prospect.Contacts.Add(contact);

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
#endregion

#region Gestion des événements
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
#endregion

#region Gestion des type d'événement
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

app.MapDelete("/type-evenement/{idtypeevenement:int}", [Authorize(Policy = "Admin")] async (int idTypeEvenement, ProspectManagerDbContext db) =>
{
    var existingTypeEvenement = await db.TypesEvenement.FindAsync(idTypeEvenement);
    if (existingTypeEvenement == null)
    {
        return Results.NotFound();
    }

    db.TypesEvenement.Remove(existingTypeEvenement);
    await db.SaveChangesAsync();

    return Results.Ok();
});
#endregion

#region Gestion des statuts
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

    db.Statuts.Remove(existingStatut);
    await db.SaveChangesAsync();

    return Results.Ok();
});
#endregion

#region Gestion des Utilisateurs
app.MapGet("/utilisateurs", [Authorize(Policy = "Admin")] async (ProspectManagerDbContext db) =>
    await db.Utilisateurs.ToListAsync());

app.MapGet("/utilisateurs/{idutilisateur:int}", [Authorize(Policy = "Admin")] async (int idUtilisateur, ProspectManagerDbContext db) =>
    await db.Utilisateurs.FindAsync(idUtilisateur) is Utilisateur utilisateur ?
    Results.Ok(utilisateur) : Results.NotFound());

app.MapPost("/utilisateurs", [Authorize(Policy = "Admin")] async ([FromBody] Utilisateur utilisateur, ProspectManagerDbContext db) =>
{
    db.Utilisateurs.Add(utilisateur);
    await db.SaveChangesAsync();

    return Results.Created($"/utilisateurs/{utilisateur.Id}", utilisateur);
});

app.MapPut("/utilisateurs/{idutilisateur:int}", [Authorize(Policy = "Admin")] async ([FromBody] Utilisateur updatedUtilisateur, int idUtilisateur, ProspectManagerDbContext db) =>
{
    if (idUtilisateur != updatedUtilisateur.Id)
        return Results.BadRequest("Les identifiants ne sont pas cohérents.");

    var existingUtilisateur = await db.Utilisateurs.FindAsync(idUtilisateur);
    if (existingUtilisateur == null)
        return Results.NotFound();

    db.Entry(existingUtilisateur).CurrentValues.SetValues(updatedUtilisateur);
    await db.SaveChangesAsync();

    return Results.Ok(existingUtilisateur);
});

app.MapDelete("/utilisateurs/{idutilisateur:int}", [Authorize(Policy = "Admin")] async (int idUtilisateur, ProspectManagerDbContext db) =>
{
    var existingUtilisateur = await db.Utilisateurs.FindAsync(idUtilisateur);
    if (existingUtilisateur == null)
    {
        return Results.NotFound();
    }

    db.Utilisateurs.Remove(existingUtilisateur);
    await db.SaveChangesAsync();

    return Results.Ok();
});
#endregion

app.MapGet("/types-organisme", [Authorize] async (ProspectManagerDbContext db) =>
    await db.TypesOrganisme.ToListAsync());

app.Run();

