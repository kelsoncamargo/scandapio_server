-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_documentIdCompany_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_documentIdCompany_fkey" FOREIGN KEY ("documentIdCompany") REFERENCES "Company"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;
