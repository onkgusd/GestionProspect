using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.Enpoints;
using ProspectManagerWebApi.Services;
using System.Text;
using System.Text.Json.Serialization;

#region Build Webapi
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

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<PasswordManagerService>();
builder.Services.AddDbContext<ProspectManagerDbContext>();
builder.Services.AddScoped<UserService>();

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
    mc.AddProfile(new MappingProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

var emailConfig = builder.Configuration.GetSection("EmailSettings");
builder.Services.AddSingleton(new EmailService(
    emailConfig["SmtpServer"] ?? "",
    int.Parse(emailConfig["SmtpPort"] ?? "0"),
    emailConfig["FromAddress"] ?? "",
    emailConfig["Login"] ?? "",
    emailConfig["Password"] ?? ""
));

builder.Logging.AddConsole();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseCors();

#endregion

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

AuthenticationEndPoints.Map(app, mapper, builder);
ProspectEndpoints.Map(app, mapper);
ProduitEndpoints.Map(app, mapper);
ContactEndpoints.Map(app);
EvenementEndpoints.Map(app, mapper);
TypeEvenementEndpoints.Map(app);
TypeOrganismeEndpoints.Map(app);
StatutEndpoints.Map(app);
UtilisateurEndpoints.Map(app, mapper);
SearchEndpoints.Map(app, mapper);
SecteurGeographiqueEndpoints.Map(app);

app.Run();

