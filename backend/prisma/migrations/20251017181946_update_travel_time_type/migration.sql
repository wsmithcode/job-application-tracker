/*
  Warnings:

  - The `travelTime` column on the `JobApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "travelTime",
ADD COLUMN     "travelTime" INTEGER;
