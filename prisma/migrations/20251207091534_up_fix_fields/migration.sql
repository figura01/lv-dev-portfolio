/*
  Warnings:

  - Made the column `image` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `excerpt` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link_url` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "excerpt" SET NOT NULL,
ALTER COLUMN "link_url" SET NOT NULL;
