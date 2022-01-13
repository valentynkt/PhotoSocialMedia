using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class defaultAdminPhone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "c4ae48d8-a4f7-4d93-9c17-65855f4d3a5d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "a5e33622-181d-496b-9fc0-719c54374991");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "PhoneNumber" },
                values: new object[] { "b9b4139b-3f72-4c72-9eb2-b148893763f8", "AQAAAAEAACcQAAAAEF0fVTqS6HsUDuqv9uE1xwyjPjZhcbMeEplZv8MHqNZqhYO2aGN2P0lgWvQorvWhmA==", "0989081789" });

            migrationBuilder.UpdateData(
                table: "ClientProfiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfRegistration",
                value: new DateTime(2022, 1, 13, 15, 12, 4, 554, DateTimeKind.Local).AddTicks(5048));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "PhoneNumber" },
                values: new object[] { "736ae281-9332-4c19-a80a-43b9c398a4a4", "AQAAAAEAACcQAAAAEPnRRXwX9o24P7q2/0gwiTk4kNEkjtHU+7yLOP1swlX6yG/dGasTA4xzR4SGHs8Amg==", null });

            migrationBuilder.UpdateData(
                table: "ClientProfiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfRegistration",
                value: new DateTime(2022, 1, 13, 15, 0, 20, 854, DateTimeKind.Local).AddTicks(8371));
        }
    }
}
