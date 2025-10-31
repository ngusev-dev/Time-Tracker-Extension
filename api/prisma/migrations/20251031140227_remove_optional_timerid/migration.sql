/*
  Warnings:

  - Made the column `timerId` on table `timerHistories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `timerId` on table `userTimers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "timerHistories" ALTER COLUMN "timerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "userTimers" ALTER COLUMN "timerId" SET NOT NULL;
