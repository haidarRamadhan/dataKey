/*
  Warnings:

  - The `houseSize` column on the `rumah` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "rumah" DROP COLUMN "houseSize",
ADD COLUMN     "houseSize" INTEGER;
