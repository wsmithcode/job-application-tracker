/*
  Warnings:

  - You are about to drop the column `JobResearchId` on the `JobApplication` table. All the data in the column will be lost.
  - Added the required column `jobResearchId` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."JobApplication" DROP CONSTRAINT "JobApplication_JobResearchId_fkey";

-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "JobResearchId",
ADD COLUMN     "jobResearchId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobResearchId_fkey" FOREIGN KEY ("jobResearchId") REFERENCES "JobResearch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
