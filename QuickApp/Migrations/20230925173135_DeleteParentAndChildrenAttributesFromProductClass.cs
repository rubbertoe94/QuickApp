using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuickApp.Migrations
{
    /// <inheritdoc />
    public partial class DeleteParentAndChildrenAttributesFromProductClass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppProducts_AppProducts_ParentId",
                table: "AppProducts");

            migrationBuilder.DropIndex(
                name: "IX_AppProducts_ParentId",
                table: "AppProducts");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "AppProducts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "AppProducts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppProducts_ParentId",
                table: "AppProducts",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppProducts_AppProducts_ParentId",
                table: "AppProducts",
                column: "ParentId",
                principalTable: "AppProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
