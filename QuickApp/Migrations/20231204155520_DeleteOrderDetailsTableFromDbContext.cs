using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuickApp.Migrations
{
    /// <inheritdoc />
    public partial class DeleteOrderDetailsTableFromDbContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppOrderDetails_AppOrders_OrderId",
                table: "AppOrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_AppOrderDetails_AppProducts_ProductId",
                table: "AppOrderDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppOrderDetails",
                table: "AppOrderDetails");

            migrationBuilder.RenameTable(
                name: "AppOrderDetails",
                newName: "OrderDetail");

            migrationBuilder.RenameIndex(
                name: "IX_AppOrderDetails_ProductId",
                table: "OrderDetail",
                newName: "IX_OrderDetail_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_AppOrderDetails_OrderId",
                table: "OrderDetail",
                newName: "IX_OrderDetail_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderDetail",
                table: "OrderDetail",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetail_AppOrders_OrderId",
                table: "OrderDetail",
                column: "OrderId",
                principalTable: "AppOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetail_AppProducts_ProductId",
                table: "OrderDetail",
                column: "ProductId",
                principalTable: "AppProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetail_AppOrders_OrderId",
                table: "OrderDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetail_AppProducts_ProductId",
                table: "OrderDetail");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderDetail",
                table: "OrderDetail");

            migrationBuilder.RenameTable(
                name: "OrderDetail",
                newName: "AppOrderDetails");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetail_ProductId",
                table: "AppOrderDetails",
                newName: "IX_AppOrderDetails_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetail_OrderId",
                table: "AppOrderDetails",
                newName: "IX_AppOrderDetails_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppOrderDetails",
                table: "AppOrderDetails",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrderDetails_AppOrders_OrderId",
                table: "AppOrderDetails",
                column: "OrderId",
                principalTable: "AppOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrderDetails_AppProducts_ProductId",
                table: "AppOrderDetails",
                column: "ProductId",
                principalTable: "AppProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
