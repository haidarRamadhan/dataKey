/*
  Warnings:

  - You are about to drop the column `name` on the `rumah` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rumah" DROP COLUMN "name",
ADD COLUMN     "houseSize" TEXT;
