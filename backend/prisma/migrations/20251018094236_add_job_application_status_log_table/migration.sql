/*
  Warnings:

  - The `status` column on the `JobApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('WHITELIST', 'APPLIED', 'ACCEPTED', 'DECLINED', 'REJECTED');

-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "status",
ADD COLUMN     "status" "JobApplicationStatus" NOT NULL DEFAULT 'APPLIED';

-- CreateTable
CREATE TABLE "JobApplicationStatusLog" (
    "id" TEXT NOT NULL,
    "jobApplicationId" TEXT NOT NULL,
    "status" "JobApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobApplicationStatusLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobApplicationStatusLog" ADD CONSTRAINT "JobApplicationStatusLog_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
