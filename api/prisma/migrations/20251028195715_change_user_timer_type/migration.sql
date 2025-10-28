/*
  Warnings:

  - You are about to alter the column `totalTimeInSeconds` on the `userTimers` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "userTimers" ALTER COLUMN "totalTimeInSeconds" SET DATA TYPE DOUBLE PRECISION;
