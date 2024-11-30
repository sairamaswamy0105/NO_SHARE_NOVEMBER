using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Shab.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangedDateFormattostring : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pincode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone_Number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PasswordResetToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "de-CH"),
                    RoleId = table.Column<int>(type: "int", nullable: false, defaultValue: 1),
                    UserImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TwoFactorSecretKey = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_users_roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "User" }
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Id", "City", "CreateDate", "DateOfBirth", "FirstName", "Language", "LastName", "Mail", "Password", "PasswordResetToken", "Phone_Number", "Pincode", "RoleId", "Street", "TwoFactorSecretKey", "UserImage" },
                values: new object[,]
                {
                    { 1, "Kakinada", new DateTime(2024, 11, 20, 12, 1, 48, 697, DateTimeKind.Local).AddTicks(8754), null, "Sai", "de-CH", "Ram", "sairamswamy0105@gmail.com", null, "cb247ba9-bcb1-46b8-b158-215f7ced7508", "+917569373620", "533016", 2, "Market Road", null, null },
                    { 2, "Visakhapatnam", new DateTime(2024, 11, 20, 12, 1, 48, 697, DateTimeKind.Local).AddTicks(8815), null, "Muka", "de-CH", "Ambika", "mukaambika@gmail.com", null, "7041baf4-e63b-4ee8-99bb-35e24f9b02b6", "+918897070200", "533048", 2, "Burma Colony", null, null },
                    { 3, "Blore", new DateTime(2024, 11, 20, 12, 1, 48, 697, DateTimeKind.Local).AddTicks(8821), null, "Kartik", "de-CH", "Kanchi", "skram0905@gmail.com", null, "c59e5e87-596c-4927-b0e7-c41f10d5efee", "+918897070200", "533048", 2, " RTC Complex", null, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_users_RoleId",
                table: "users",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "roles");
        }
    }
}
