using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuickApp.Migrations
{
    /// <inheritdoc />
    public partial class AddProductIdToOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppOrders_AppProducts_ProductId",
                table: "AppOrders");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "AppOrders",
                type: "int",
                nullable: true,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrders_AppProducts_ProductId",
                table: "AppOrders",
                column: "ProductId",
                principalTable: "AppProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppOrders_AppProducts_ProductId",
                table: "AppOrders");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "AppOrders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrders_AppProducts_ProductId",
                table: "AppOrders",
                column: "ProductId",
                principalTable: "AppProducts",
                principalColumn: "Id");
        }
    }
}
