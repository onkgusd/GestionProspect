using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProspectManagerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddActifFieldsToEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Actif",
                table: "TypesOrganisme",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Actif",
                table: "TypesEvenement",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Actif",
                table: "Statuts",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Actif",
                table: "TypesOrganisme");

            migrationBuilder.DropColumn(
                name: "Actif",
                table: "TypesEvenement");

            migrationBuilder.DropColumn(
                name: "Actif",
                table: "Statuts");
        }
    }
}
