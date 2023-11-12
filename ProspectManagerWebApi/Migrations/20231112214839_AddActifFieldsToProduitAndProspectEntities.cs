using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProspectManagerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddActifFieldsToProduitAndProspectEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Actif",
                table: "Prospects",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Actif",
                table: "Produits",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Actif",
                table: "Prospects");

            migrationBuilder.DropColumn(
                name: "Actif",
                table: "Produits");
        }
    }
}
