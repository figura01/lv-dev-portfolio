/*
  Warnings:

  - The primary key for the `_ProjectToTechnology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_ProjectToTechnology` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_ProjectToTechnology" DROP CONSTRAINT "_ProjectToTechnology_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTechnology_AB_unique" ON "_ProjectToTechnology"("A", "B");
