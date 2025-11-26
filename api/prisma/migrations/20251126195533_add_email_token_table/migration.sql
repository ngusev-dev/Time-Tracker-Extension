/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tokens_email_key" ON "tokens"("email");
