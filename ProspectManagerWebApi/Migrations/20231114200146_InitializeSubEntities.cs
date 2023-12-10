using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProspectManagerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class InitializeSubEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prospects_Statuts_StatutId",
                table: "Prospects");

            migrationBuilder.DropForeignKey(
                name: "FK_Prospects_TypesOrganisme_TypeOrganismeId",
                table: "Prospects");

            migrationBuilder.DropForeignKey(
                name: "FK_Prospects_Utilisateurs_UtilisateurCreationId",
                table: "Prospects");

            migrationBuilder.AlterColumn<int>(
                name: "UtilisateurCreationId",
                table: "Prospects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TypeOrganismeId",
                table: "Prospects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StatutId",
                table: "Prospects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Prospects_Statuts_StatutId",
                table: "Prospects",
                column: "StatutId",
                principalTable: "Statuts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Prospects_TypesOrganisme_TypeOrganismeId",
                table: "Prospects",
                column: "TypeOrganismeId",
                principalTable: "TypesOrganisme",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Prospects_Utilisateurs_UtilisateurCreationId",
                table: "Prospects",
                column: "UtilisateurCreationId",
                principalTable: "Utilisateurs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prospects_Statuts_StatutId",
                table: "Prospects");

            migrationBuilder.DropForeignKey(
                name: "FK_Prospects_TypesOrganisme_TypeOrganismeId",
                table: "Prospects");

            migrationBuilder.DropForeignKey(
                name: "FK_Prospects_Utilisateurs_UtilisateurCreationId",
                table: "Prospects");

            migrationBuilder.AlterColumn<int>(
                name: "UtilisateurCreationId",
                table: "Prospects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "TypeOrganismeId",
                table: "Prospects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "StatutId",
                table: "Prospects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Prospects_Statuts_StatutId",
                table: "Prospects",
                column: "StatutId",
                principalTable: "Statuts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Prospects_TypesOrganisme_TypeOrganismeId",
                table: "Prospects",
                column: "TypeOrganismeId",
                principalTable: "TypesOrganisme",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Prospects_Utilisateurs_UtilisateurCreationId",
                table: "Prospects",
                column: "UtilisateurCreationId",
                principalTable: "Utilisateurs",
                principalColumn: "Id");
        }
    }
}
