using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuickApp.Migrations
{
    /// <inheritdoc />
    public partial class RemoveProductFromOrderModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppOrders_AppProducts_ProductId",
                table: "AppOrders");

            migrationBuilder.DropIndex(
                name: "IX_AppOrders_ProductId",
                table: "AppOrders");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "AppOrders");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "AppOrders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AppOrders_ProductId",
                table: "AppOrders",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrders_AppProducts_ProductId",
                table: "AppOrders",
                column: "ProductId",
                principalTable: "AppProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
