using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProspectManagerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddSecteurGeographiqueEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Departement",
                table: "Prospects");

            migrationBuilder.AddColumn<int>(
                name: "SecteurGeographiqueId",
                table: "Prospects",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SecteursGeographiques",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Actif = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SecteursGeographiques", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Prospects_SecteurGeographiqueId",
                table: "Prospects",
                column: "SecteurGeographiqueId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prospects_SecteursGeographiques_SecteurGeographiqueId",
                table: "Prospects",
                column: "SecteurGeographiqueId",
                principalTable: "SecteursGeographiques",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prospects_SecteursGeographiques_SecteurGeographiqueId",
                table: "Prospects");

            migrationBuilder.DropTable(
                name: "SecteursGeographiques");

            migrationBuilder.DropIndex(
                name: "IX_Prospects_SecteurGeographiqueId",
                table: "Prospects");

            migrationBuilder.DropColumn(
                name: "SecteurGeographiqueId",
                table: "Prospects");

            migrationBuilder.AddColumn<string>(
                name: "Departement",
                table: "Prospects",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
