using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProspectManagerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class SetEvenementResulatOptional : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Prospects_ProspectId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Evenements_Contacts_ContactId",
                table: "Evenements");

            migrationBuilder.DropForeignKey(
                name: "FK_Evenements_Utilisateurs_UtilisateurId",
                table: "Evenements");

            migrationBuilder.AlterColumn<int>(
                name: "UtilisateurId",
                table: "Evenements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Resultat",
                table: "Evenements",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "Evenements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ProspectId",
                table: "Contacts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Prospects_ProspectId",
                table: "Contacts",
                column: "ProspectId",
                principalTable: "Prospects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Evenements_Contacts_ContactId",
                table: "Evenements",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Evenements_Utilisateurs_UtilisateurId",
                table: "Evenements",
                column: "UtilisateurId",
                principalTable: "Utilisateurs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Prospects_ProspectId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Evenements_Contacts_ContactId",
                table: "Evenements");

            migrationBuilder.DropForeignKey(
                name: "FK_Evenements_Utilisateurs_UtilisateurId",
                table: "Evenements");

            migrationBuilder.AlterColumn<int>(
                name: "UtilisateurId",
                table: "Evenements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Resultat",
                table: "Evenements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "Evenements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProspectId",
                table: "Contacts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Prospects_ProspectId",
                table: "Contacts",
                column: "ProspectId",
                principalTable: "Prospects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Evenements_Contacts_ContactId",
                table: "Evenements",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Evenements_Utilisateurs_UtilisateurId",
                table: "Evenements",
                column: "UtilisateurId",
                principalTable: "Utilisateurs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
