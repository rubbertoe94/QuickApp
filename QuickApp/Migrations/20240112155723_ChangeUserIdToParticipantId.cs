using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuickApp.Migrations
{
    /// <inheritdoc />
    public partial class ChangeUserIdToParticipantId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_User_UserId",
                table: "Lessons");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Lessons",
                newName: "ParticipantId");

            migrationBuilder.RenameIndex(
                name: "IX_Lessons_UserId",
                table: "Lessons",
                newName: "IX_Lessons_ParticipantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_User_ParticipantId",
                table: "Lessons",
                column: "ParticipantId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_User_ParticipantId",
                table: "Lessons");

            migrationBuilder.RenameColumn(
                name: "ParticipantId",
                table: "Lessons",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Lessons_ParticipantId",
                table: "Lessons",
                newName: "IX_Lessons_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_User_UserId",
                table: "Lessons",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
