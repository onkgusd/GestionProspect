using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProspectManagerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddModificationListToProduitEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Utilisateurs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Empreinte",
                table: "Utilisateurs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProduitId",
                table: "Modifications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Modifications_ProduitId",
                table: "Modifications",
                column: "ProduitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Modifications_Produits_ProduitId",
                table: "Modifications",
                column: "ProduitId",
                principalTable: "Produits",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Modifications_Produits_ProduitId",
                table: "Modifications");

            migrationBuilder.DropIndex(
                name: "IX_Modifications_ProduitId",
                table: "Modifications");

            migrationBuilder.DropColumn(
                name: "ProduitId",
                table: "Modifications");

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Utilisateurs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Empreinte",
                table: "Utilisateurs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
