/*
  Warnings:

  - Added the required column `status` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL;
