/*
  Warnings:

  - You are about to drop the column `endTimer` on the `userTimers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userTimers" DROP COLUMN "endTimer",
ADD COLUMN     "totalTimeInSeconds" DECIMAL(65,30) NOT NULL DEFAULT 0;
