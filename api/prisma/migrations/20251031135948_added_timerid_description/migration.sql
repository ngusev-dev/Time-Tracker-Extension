/*
  Warnings:

  - A unique constraint covering the columns `[timerId]` on the table `userTimers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "timerHistories" ADD COLUMN     "description" TEXT,
ADD COLUMN     "timerId" UUID;

-- AlterTable
ALTER TABLE "userTimers" ADD COLUMN     "description" TEXT,
ADD COLUMN     "timerId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "userTimers_timerId_key" ON "userTimers"("timerId");
