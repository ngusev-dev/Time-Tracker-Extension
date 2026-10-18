-- AlterTable
ALTER TABLE "timerHistories" ADD COLUMN     "taskTypeId" UUID;

-- AlterTable
ALTER TABLE "userTimers" ADD COLUMN     "taskTypeId" UUID;

-- CreateTable
CREATE TABLE "taskTypes" (
    "id" UUID NOT NULL,
    "parentId" UUID,
    "name" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "taskTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "taskTypes_parentId_idx" ON "taskTypes"("parentId");

-- Partial unique indexes: NULL parentId values are distinct for a regular unique index
CREATE UNIQUE INDEX "taskTypes_root_name_key" ON "taskTypes"("name") WHERE "parentId" IS NULL;
CREATE UNIQUE INDEX "taskTypes_parentId_name_key" ON "taskTypes"("parentId", "name") WHERE "parentId" IS NOT NULL;

-- CreateIndex
CREATE INDEX "timerHistories_taskTypeId_idx" ON "timerHistories"("taskTypeId");

-- AddForeignKey
ALTER TABLE "userTimers" ADD CONSTRAINT "userTimers_taskTypeId_fkey" FOREIGN KEY ("taskTypeId") REFERENCES "taskTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timerHistories" ADD CONSTRAINT "timerHistories_taskTypeId_fkey" FOREIGN KEY ("taskTypeId") REFERENCES "taskTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskTypes" ADD CONSTRAINT "taskTypes_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "taskTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
