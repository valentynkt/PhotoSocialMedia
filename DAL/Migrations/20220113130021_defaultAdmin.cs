using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class defaultAdmin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "c09d42c9-d592-4377-b842-8afe9870f6ce");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "d5e64f79-b0ed-44bc-8d3b-a859c0099087");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { 1, 0, "736ae281-9332-4c19-a80a-43b9c398a4a4", "valikit14@gmail.com", true, false, null, "valikit14@gmail.com", "valikit14@gmail.com", "AQAAAAEAACcQAAAAEPnRRXwX9o24P7q2/0gwiTk4kNEkjtHU+7yLOP1swlX6yG/dGasTA4xzR4SGHs8Amg==", null, false, "", false, "valikit14@gmail.com" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[] { 1, 2 });

            migrationBuilder.InsertData(
                table: "ClientProfiles",
                columns: new[] { "Id", "About", "DateOfRegistration", "FirstName", "Gender", "SecondName" },
                values: new object[] { 1, "I'm Admin", new DateTime(2022, 1, 13, 15, 0, 20, 854, DateTimeKind.Local).AddTicks(8371), "Valentyn", "male", "Kit" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "ClientProfiles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "fe33e6ec-28b5-4688-8646-2ae1f07a32d4");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "cb794c62-63e2-4fe9-85ee-1bb24e00373c");
        }
    }
}
