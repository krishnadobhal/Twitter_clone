/*
  Warnings:

  - You are about to drop the column `like` on the `Tweet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tweetId,UserID]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "like",
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Like_tweetId_UserID_key" ON "Like"("tweetId", "UserID");
