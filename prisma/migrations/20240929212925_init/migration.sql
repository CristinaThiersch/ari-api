/*
  Warnings:

  - You are about to drop the column `function` on the `Medication` table. All the data in the column will be lost.
  - Added the required column `functionMed` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "function",
ADD COLUMN     "functionMed" TEXT NOT NULL;
