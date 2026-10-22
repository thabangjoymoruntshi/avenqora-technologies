-- CreateTable
CREATE TABLE "AutomationTask" (
    "id" TEXT NOT NULL,
    "inquiryId" TEXT NOT NULL,
    "ruleKey" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "reason" TEXT NOT NULL,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AutomationTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AutomationTask_status_dueAt_idx" ON "AutomationTask"("status", "dueAt");

-- CreateIndex
CREATE UNIQUE INDEX "AutomationTask_inquiryId_ruleKey_key" ON "AutomationTask"("inquiryId", "ruleKey");

-- AddForeignKey
ALTER TABLE "AutomationTask" ADD CONSTRAINT "AutomationTask_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "Inquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
