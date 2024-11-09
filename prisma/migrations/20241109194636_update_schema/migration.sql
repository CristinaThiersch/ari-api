/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `History` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Usuario";
