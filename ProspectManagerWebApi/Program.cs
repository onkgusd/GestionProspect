using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
builder.Services.AddSwaggerGen();

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

        var expirationDate = DateTime.UtcNow.AddMinutes(1);
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

// Gestion des produits
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
    {
        return Results.BadRequest("Les identifiants produits ne sont pas cohérents.");
    }

    if (await db.Produits.FindAsync(idProduit) is Produit produit)
    {
        produit.Description = updatedProduit.Description;
        produit.Libelle = updatedProduit.Libelle;

        db.Produits.Update(produit);
        await db.SaveChangesAsync();
        return Results.Ok(produit);
    }
    else return Results.NotFound();
});

// Gestion des prospects
app.MapGet("/prospects", async (ProspectManagerDbContext db) =>
    await db.Prospects.ToListAsync());

app.MapGet("/prospects/{idprospect:int}", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
    await db.Prospects.FindAsync(idprospect) is Prospect prospect ?
    Results.Ok(prospect) : Results.NotFound());

app.MapPatch("/prospects/{idprospect:int}", [Authorize] async (int idprospect, [FromBody] Prospect updatedProspect, ProspectManagerDbContext db) =>
{
    if (await db.Prospects.FindAsync(idprospect) is Prospect prospect)
    {
        prospect = updatedProspect;
        Results.Ok(prospect);
    }
    else Results.NotFound();
});

app.MapPost("/prospects/", [Authorize] async ([FromBody] Prospect prospect, ProspectManagerDbContext db) =>
{
    db.Prospects.Add(prospect);
    await db.SaveChangesAsync();

    return Results.Created($"/prospects/{prospect.Id}", prospect);
});

app.MapGet("/prospects/{idprospect:int}/contacts", [Authorize] async (int idprospect, ProspectManagerDbContext db) =>
    await db.Prospects.Where(p => p.Id == idprospect).Select(p => p.Contacts).ToListAsync());


app.MapGet("/evenements", [Authorize] async (ProspectManagerDbContext db) =>
    await db.Evenements.ToListAsync());

app.MapGet("/typesevenement", [Authorize] async (ProspectManagerDbContext db) =>
    await db.TypesEvenement.ToListAsync());

app.MapGet("/typesorganisme", [Authorize] async (ProspectManagerDbContext db) =>
    await db.TypesOrganisme.ToListAsync());

app.MapGet("/utilisateurs", [Authorize(Policy = "Admin")] async (ProspectManagerDbContext db) =>
    await db.Utilisateurs.ToListAsync());

app.Run();

