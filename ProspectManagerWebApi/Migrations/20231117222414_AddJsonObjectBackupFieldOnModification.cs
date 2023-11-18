using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProspectManagerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddJsonObjectBackupFieldOnModification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Prospects_ProspectId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Evenements_Prospects_ProspectId",
                table: "Evenements");

            migrationBuilder.AddColumn<string>(
                name: "JsonObjectBackup",
                table: "Modifications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "ProspectId",
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

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "Contacts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Prospects_ProspectId",
                table: "Contacts",
                column: "ProspectId",
                principalTable: "Prospects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Evenements_Prospects_ProspectId",
                table: "Evenements",
                column: "ProspectId",
                principalTable: "Prospects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Prospects_ProspectId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Evenements_Prospects_ProspectId",
                table: "Evenements");

            migrationBuilder.DropColumn(
                name: "JsonObjectBackup",
                table: "Modifications");

            migrationBuilder.AlterColumn<int>(
                name: "ProspectId",
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

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "Contacts",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Prospects_ProspectId",
                table: "Contacts",
                column: "ProspectId",
                principalTable: "Prospects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Evenements_Prospects_ProspectId",
                table: "Evenements",
                column: "ProspectId",
                principalTable: "Prospects",
                principalColumn: "Id");
        }
    }
}
