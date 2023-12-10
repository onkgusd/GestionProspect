using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProspectManagerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddEvenementsToProspect : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProspectId",
                table: "Evenements",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Evenements_ProspectId",
                table: "Evenements",
                column: "ProspectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Evenements_Prospects_ProspectId",
                table: "Evenements",
                column: "ProspectId",
                principalTable: "Prospects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evenements_Prospects_ProspectId",
                table: "Evenements");

            migrationBuilder.DropIndex(
                name: "IX_Evenements_ProspectId",
                table: "Evenements");

            migrationBuilder.DropColumn(
                name: "ProspectId",
                table: "Evenements");
        }
    }
}
