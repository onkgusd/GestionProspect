using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProspectManagerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Produits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Reference = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Statuts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypesEvenement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypesEvenement", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypesOrganisme",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypesOrganisme", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Utilisateurs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Login = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Empreinte = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateConnexion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModificationMotDePasse = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Admin = table.Column<bool>(type: "bit", nullable: false),
                    Actif = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilisateurs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Prospects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Departement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adresse = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecteurActivite = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCreation = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StatutId = table.Column<int>(type: "int", nullable: false),
                    TypeOrganismeId = table.Column<int>(type: "int", nullable: false),
                    UtilisateurCreationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prospects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Prospects_Statuts_StatutId",
                        column: x => x.StatutId,
                        principalTable: "Statuts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Prospects_TypesOrganisme_TypeOrganismeId",
                        column: x => x.TypeOrganismeId,
                        principalTable: "TypesOrganisme",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Prospects_Utilisateurs_UtilisateurCreationId",
                        column: x => x.UtilisateurCreationId,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fonction = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Actif = table.Column<bool>(type: "bit", nullable: false),
                    ProspectId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contacts_Prospects_ProspectId",
                        column: x => x.ProspectId,
                        principalTable: "Prospects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProduitProspect",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProduitId = table.Column<int>(type: "int", nullable: false),
                    ProspectId = table.Column<int>(type: "int", nullable: false),
                    ProbabiliteSucces = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProduitProspect", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProduitProspect_Produits_ProduitId",
                        column: x => x.ProduitId,
                        principalTable: "Produits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProduitProspect_Prospects_ProspectId",
                        column: x => x.ProspectId,
                        principalTable: "Prospects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Evenements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeEvenementId = table.Column<int>(type: "int", nullable: false),
                    DateEvenement = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Resultat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactId = table.Column<int>(type: "int", nullable: false),
                    UtilisateurId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evenements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Evenements_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Evenements_TypesEvenement_TypeEvenementId",
                        column: x => x.TypeEvenementId,
                        principalTable: "TypesEvenement",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Evenements_Utilisateurs_UtilisateurId",
                        column: x => x.UtilisateurId,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EvenementProduit",
                columns: table => new
                {
                    EvenementsId = table.Column<int>(type: "int", nullable: false),
                    ProduitsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EvenementProduit", x => new { x.EvenementsId, x.ProduitsId });
                    table.ForeignKey(
                        name: "FK_EvenementProduit_Evenements_EvenementsId",
                        column: x => x.EvenementsId,
                        principalTable: "Evenements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EvenementProduit_Produits_ProduitsId",
                        column: x => x.ProduitsId,
                        principalTable: "Produits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Modifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateModification = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Table = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Champ = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AncienneValeur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NouvelleValeur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UtilisateurId = table.Column<int>(type: "int", nullable: false),
                    ContactId = table.Column<int>(type: "int", nullable: true),
                    EvenementId = table.Column<int>(type: "int", nullable: true),
                    ProduitProspectId = table.Column<int>(type: "int", nullable: true),
                    ProspectId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Modifications_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Modifications_Evenements_EvenementId",
                        column: x => x.EvenementId,
                        principalTable: "Evenements",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Modifications_ProduitProspect_ProduitProspectId",
                        column: x => x.ProduitProspectId,
                        principalTable: "ProduitProspect",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Modifications_Prospects_ProspectId",
                        column: x => x.ProspectId,
                        principalTable: "Prospects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Modifications_Utilisateurs_UtilisateurId",
                        column: x => x.UtilisateurId,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_ProspectId",
                table: "Contacts",
                column: "ProspectId");

            migrationBuilder.CreateIndex(
                name: "IX_EvenementProduit_ProduitsId",
                table: "EvenementProduit",
                column: "ProduitsId");

            migrationBuilder.CreateIndex(
                name: "IX_Evenements_ContactId",
                table: "Evenements",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_Evenements_TypeEvenementId",
                table: "Evenements",
                column: "TypeEvenementId");

            migrationBuilder.CreateIndex(
                name: "IX_Evenements_UtilisateurId",
                table: "Evenements",
                column: "UtilisateurId");

            migrationBuilder.CreateIndex(
                name: "IX_Modifications_ContactId",
                table: "Modifications",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_Modifications_EvenementId",
                table: "Modifications",
                column: "EvenementId");

            migrationBuilder.CreateIndex(
                name: "IX_Modifications_ProduitProspectId",
                table: "Modifications",
                column: "ProduitProspectId");

            migrationBuilder.CreateIndex(
                name: "IX_Modifications_ProspectId",
                table: "Modifications",
                column: "ProspectId");

            migrationBuilder.CreateIndex(
                name: "IX_Modifications_UtilisateurId",
                table: "Modifications",
                column: "UtilisateurId");

            migrationBuilder.CreateIndex(
                name: "IX_ProduitProspect_ProduitId",
                table: "ProduitProspect",
                column: "ProduitId");

            migrationBuilder.CreateIndex(
                name: "IX_ProduitProspect_ProspectId",
                table: "ProduitProspect",
                column: "ProspectId");

            migrationBuilder.CreateIndex(
                name: "IX_Prospects_StatutId",
                table: "Prospects",
                column: "StatutId");

            migrationBuilder.CreateIndex(
                name: "IX_Prospects_TypeOrganismeId",
                table: "Prospects",
                column: "TypeOrganismeId");

            migrationBuilder.CreateIndex(
                name: "IX_Prospects_UtilisateurCreationId",
                table: "Prospects",
                column: "UtilisateurCreationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EvenementProduit");

            migrationBuilder.DropTable(
                name: "Modifications");

            migrationBuilder.DropTable(
                name: "Evenements");

            migrationBuilder.DropTable(
                name: "ProduitProspect");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "TypesEvenement");

            migrationBuilder.DropTable(
                name: "Produits");

            migrationBuilder.DropTable(
                name: "Prospects");

            migrationBuilder.DropTable(
                name: "Statuts");

            migrationBuilder.DropTable(
                name: "TypesOrganisme");

            migrationBuilder.DropTable(
                name: "Utilisateurs");
        }
    }
}
