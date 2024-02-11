/*
  Warnings:

  - Added the required column `postDate` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT,
ADD COLUMN     "postDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tags" TEXT;
