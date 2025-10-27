-- CreateEnum
CREATE TYPE "TimerStatus" AS ENUM ('NEW', 'WORKING', 'PAUSE');

-- CreateTable
CREATE TABLE "userTimers" (
    "id" SERIAL NOT NULL,
    "startTimer" TIMESTAMP(3),
    "endTimer" TIMESTAMP(3),
    "status" "TimerStatus" NOT NULL DEFAULT 'NEW',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userTimers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timerHistories" (
    "id" SERIAL NOT NULL,
    "startTimer" TIMESTAMP(3) NOT NULL,
    "endTimer" TIMESTAMP(3) NOT NULL,
    "totalTime" DECIMAL(65,30) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "timerHistories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userTimers_userId_key" ON "userTimers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "timerHistories_userId_key" ON "timerHistories"("userId");

-- AddForeignKey
ALTER TABLE "userTimers" ADD CONSTRAINT "userTimers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timerHistories" ADD CONSTRAINT "timerHistories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
