using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
builder.Services.AddSwaggerGen(c => {
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
}); ;

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
[AllowAnonymous] (LoginRequestDTO user) =>
{
    if (user.Login == "User" || user.Login == "Admin")
    {
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
            new Claim(ClaimTypes.Name, user.Login),
            new Claim(ClaimTypes.Role, user.Login)
            },
            expires: expirationDate);

        var tokenHandler = new JwtSecurityTokenHandler();
        var stringToken = tokenHandler.WriteToken(token);

        return Results.Ok(new LoginResponseDTO() { Token = stringToken, ExpirationDate = expirationDate });
    }
    else
    {
        return Results.Unauthorized();
    }
});
#endregion

#region Gestion des produits
app.MapGet("/produits", [Authorize] async (ProspectManagerDbContext db) =>
    await db.Produits.ToListAsync());

app.MapPost("/produits", [Authorize(Policy = "Admin")] async ([FromBody] Produit produit, ProspectManagerDbContext db) =>
    {
        db.Produits.Add(produit);
        await db.SaveChangesAsync();

        return Results.Created($"/produits/{produit.Id}", produit);
    });

app.MapGet("/produits/{idproduit:int}", [Authorize] async (int idProduit, ProspectManagerDbContext db) =>
    await db.Produits.FindAsync(idProduit) is Produit produit ?
    Results.Ok(produit) : Results.NotFound());

app.MapPut("/produits/{idproduit:int}", [Authorize] async ([FromBody] Produit updatedProduit, int idProduit, ProspectManagerDbContext db) =>
{
    if (idProduit != updatedProduit.Id)
        return Results.BadRequest("Les identifiants produits ne sont pas coh�rents.");

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
    await db.Prospects.ToListAsync());

app.MapGet("/prospects/{idprospect:int}", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
    await db.Prospects.Include(p => p.Contacts).FirstOrDefaultAsync(p => p.Id == idprospect) is Prospect prospect ?
    Results.Ok(prospect) : Results.NotFound());

app.MapPut("/prospects/{idprospect:int}", [Authorize] async ([FromBody] Produit updatedProspect, int idProduit, ProspectManagerDbContext db) =>
{
    if (idProduit != updatedProspect.Id)
        return Results.BadRequest("Les identifiants produits ne sont pas coh�rents.");

    var existingProduit = await db.Produits.FindAsync(idProduit);
    if (existingProduit == null)
        return Results.NotFound();

    db.Entry(existingProduit).CurrentValues.SetValues(updatedProspect);
    await db.SaveChangesAsync();

    return Results.Ok(existingProduit);
});

app.MapPost("/prospects/", [Authorize] async ([FromBody] Prospect prospect, ProspectManagerDbContext db) =>
{
    prospect.DateCreation = DateTime.UtcNow;
    db.Prospects.Add(prospect);
    await db.SaveChangesAsync();

    return Results.Created($"/prospects/{prospect.Id}", prospect);
});
#endregion

#region Gestion des contacts
app.MapGet("/prospects/{idprospect:int}/contacts", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
    await db.Prospects.Where(p => p.Id == idprospect).Select(p => p.Contacts).ToListAsync());

app.MapGet("/contacts", async (ProspectManagerDbContext db) =>
    await db.Contacts.ToListAsync());

app.MapGet("/contacts/{idcontact:int}", [Authorize] async (int idcontact, ProspectManagerDbContext db) =>
    await db.Contacts.FirstOrDefaultAsync(c => c.Id == idcontact) is Contact contact ?
    Results.Ok(contact) : Results.NotFound());

app.MapPut("/contacts/{idcontact:int}", [Authorize] async ([FromBody] Contact updatedContact, int idcontact, ProspectManagerDbContext db) =>
{
    if (idcontact != updatedContact.Id)
        return Results.BadRequest("Les identifiants de contact ne sont pas coh�rents.");

    var existingContact = await db.Contacts.FindAsync(idcontact);
    if (existingContact == null)
        return Results.NotFound();

    db.Entry(existingContact).CurrentValues.SetValues(updatedContact);
    await db.SaveChangesAsync();

    return Results.Ok(existingContact);
});

app.MapPost("/contacts/", [Authorize] async ([FromBody] Contact contact, ProspectManagerDbContext db) =>
{
    db.Contacts.Add(contact);
    await db.SaveChangesAsync();

    return Results.Created($"/contacts/{contact.Id}", contact);
});
#endregion


app.MapGet("/evenements", [Authorize] async (ProspectManagerDbContext db) =>
    await db.Evenements.ToListAsync());

#region Gestion des type d'�v�nement
app.MapGet("/types-evenement", [Authorize] async (ProspectManagerDbContext db) =>
    await db.TypesEvenement.ToListAsync());

app.MapPost("/types-evenement", [Authorize(Policy = "Admin")] async ([FromBody] TypeEvenement typeEvenement, ProspectManagerDbContext db) =>
{
    db.TypesEvenement.Add(typeEvenement);
    await db.SaveChangesAsync();

    return Results.Created($"/produits/{typeEvenement.Id}", typeEvenement);
});

app.MapGet("/types-evenement/{idtypeevenement:int}", [Authorize] async (int idTypeEvenement, ProspectManagerDbContext db) =>
    await db.TypesEvenement.FindAsync(idTypeEvenement) is TypeEvenement typeEvenement ?
    Results.Ok(typeEvenement) : Results.NotFound());

app.MapPut("/types-evenement/{idtypeevenement:int}", [Authorize] async ([FromBody] TypeEvenement updatedTypeEvenement, int idTypeEvenement, ProspectManagerDbContext db) =>
{
    if (idTypeEvenement != updatedTypeEvenement.Id)
        return Results.BadRequest("Les identifiants ne sont pas coh�rents.");

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

app.MapGet("/types-organisme", [Authorize] async (ProspectManagerDbContext db) =>
    await db.TypesOrganisme.ToListAsync());

app.MapGet("/utilisateurs", [Authorize(Policy = "Admin")] async (ProspectManagerDbContext db) =>
    await db.Utilisateurs.ToListAsync());

app.Run();

