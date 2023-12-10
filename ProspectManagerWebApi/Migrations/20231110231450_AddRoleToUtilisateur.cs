using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProspectManagerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleToUtilisateur : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Admin",
                table: "Utilisateurs");

            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "Utilisateurs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Utilisateurs");

            migrationBuilder.AddColumn<bool>(
                name: "Admin",
                table: "Utilisateurs",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
