/*
  Warnings:

  - You are about to drop the column `totalTime` on the `timerHistories` table. All the data in the column will be lost.
  - Added the required column `totalTimeInSeconds` to the `timerHistories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timerHistories" DROP COLUMN "totalTime",
ADD COLUMN     "totalTimeInSeconds" DOUBLE PRECISION NOT NULL;
