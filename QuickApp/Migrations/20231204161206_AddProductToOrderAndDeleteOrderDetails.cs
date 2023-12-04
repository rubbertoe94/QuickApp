using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuickApp.Migrations
{
    /// <inheritdoc />
    public partial class AddProductToOrderAndDeleteOrderDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                newName: "AppOrderDetail");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetail_ProductId",
                table: "AppOrderDetail",
                newName: "IX_AppOrderDetail_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetail_OrderId",
                table: "AppOrderDetail",
                newName: "IX_AppOrderDetail_OrderId");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "AppOrders",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppOrderDetail",
                table: "AppOrderDetail",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_AppOrders_ProductId",
                table: "AppOrders",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrderDetail_AppOrders_OrderId",
                table: "AppOrderDetail",
                column: "OrderId",
                principalTable: "AppOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrderDetail_AppProducts_ProductId",
                table: "AppOrderDetail",
                column: "ProductId",
                principalTable: "AppProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrders_AppProducts_ProductId",
                table: "AppOrders",
                column: "ProductId",
                principalTable: "AppProducts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppOrderDetail_AppOrders_OrderId",
                table: "AppOrderDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_AppOrderDetail_AppProducts_ProductId",
                table: "AppOrderDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_AppOrders_AppProducts_ProductId",
                table: "AppOrders");

            migrationBuilder.DropIndex(
                name: "IX_AppOrders_ProductId",
                table: "AppOrders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppOrderDetail",
                table: "AppOrderDetail");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "AppOrders");

            migrationBuilder.RenameTable(
                name: "AppOrderDetail",
                newName: "OrderDetail");

            migrationBuilder.RenameIndex(
                name: "IX_AppOrderDetail_ProductId",
                table: "OrderDetail",
                newName: "IX_OrderDetail_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_AppOrderDetail_OrderId",
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
    }
}
