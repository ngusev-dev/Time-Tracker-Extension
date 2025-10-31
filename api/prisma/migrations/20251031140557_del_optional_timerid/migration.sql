/*
  Warnings:

  - Made the column `timerId` on table `userTimers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "userTimers" ALTER COLUMN "timerId" SET NOT NULL;
