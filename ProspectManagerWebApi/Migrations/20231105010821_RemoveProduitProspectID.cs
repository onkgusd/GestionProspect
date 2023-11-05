using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProspectManagerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveProduitProspectID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Modifications_ProduitProspect_ProduitProspectId",
                table: "Modifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProduitProspect",
                table: "ProduitProspect");

            migrationBuilder.DropIndex(
                name: "IX_ProduitProspect_ProduitId",
                table: "ProduitProspect");

            migrationBuilder.DropIndex(
                name: "IX_Modifications_ProduitProspectId",
                table: "Modifications");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProduitProspect");

            migrationBuilder.RenameColumn(
                name: "ProduitProspectId",
                table: "Modifications",
                newName: "ProduitProspectProspectId");

            migrationBuilder.AlterColumn<string>(
                name: "Telephone",
                table: "Prospects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "SecteurActivite",
                table: "Prospects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Mail",
                table: "Prospects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Departement",
                table: "Prospects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Adresse",
                table: "Prospects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "ProduitProspectProduitId",
                table: "Modifications",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProduitProspect",
                table: "ProduitProspect",
                columns: new[] { "ProduitId", "ProspectId" });

            migrationBuilder.CreateIndex(
                name: "IX_Modifications_ProduitProspectProduitId_ProduitProspectProspectId",
                table: "Modifications",
                columns: new[] { "ProduitProspectProduitId", "ProduitProspectProspectId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Modifications_ProduitProspect_ProduitProspectProduitId_ProduitProspectProspectId",
                table: "Modifications",
                columns: new[] { "ProduitProspectProduitId", "ProduitProspectProspectId" },
                principalTable: "ProduitProspect",
                principalColumns: new[] { "ProduitId", "ProspectId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Modifications_ProduitProspect_ProduitProspectProduitId_ProduitProspectProspectId",
                table: "Modifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProduitProspect",
                table: "ProduitProspect");

            migrationBuilder.DropIndex(
                name: "IX_Modifications_ProduitProspectProduitId_ProduitProspectProspectId",
                table: "Modifications");

            migrationBuilder.DropColumn(
                name: "ProduitProspectProduitId",
                table: "Modifications");

            migrationBuilder.RenameColumn(
                name: "ProduitProspectProspectId",
                table: "Modifications",
                newName: "ProduitProspectId");

            migrationBuilder.AlterColumn<string>(
                name: "Telephone",
                table: "Prospects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SecteurActivite",
                table: "Prospects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Mail",
                table: "Prospects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Departement",
                table: "Prospects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Adresse",
                table: "Prospects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ProduitProspect",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProduitProspect",
                table: "ProduitProspect",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProduitProspect_ProduitId",
                table: "ProduitProspect",
                column: "ProduitId");

            migrationBuilder.CreateIndex(
                name: "IX_Modifications_ProduitProspectId",
                table: "Modifications",
                column: "ProduitProspectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Modifications_ProduitProspect_ProduitProspectId",
                table: "Modifications",
                column: "ProduitProspectId",
                principalTable: "ProduitProspect",
                principalColumn: "Id");
        }
    }
}
