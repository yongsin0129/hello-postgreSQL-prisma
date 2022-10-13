/*
  Warnings:

  - You are about to drop the column `userId` on the `UserPreferences` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UserPreferencesId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserPreferences" DROP CONSTRAINT "UserPreferences_userId_fkey";

-- DropIndex
DROP INDEX "UserPreferences_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "UserPreferencesId" TEXT;

-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "User_UserPreferencesId_key" ON "User"("UserPreferencesId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_UserPreferencesId_fkey" FOREIGN KEY ("UserPreferencesId") REFERENCES "UserPreferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;
