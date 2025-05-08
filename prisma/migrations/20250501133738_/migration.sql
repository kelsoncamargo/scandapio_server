/*
  Warnings:

  - You are about to drop the column `companyId` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'OWNER';

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyId";

-- CreateIndex
CREATE INDEX "User_documentIdCompany_email_idx" ON "User"("documentIdCompany", "email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_documentIdCompany_fkey" FOREIGN KEY ("documentIdCompany") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
