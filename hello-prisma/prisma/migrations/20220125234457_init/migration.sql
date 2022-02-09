/*
  Warnings:

  - A unique constraint covering the columns `[Username]` on the table `Mitarbeiter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Username` to the `Mitarbeiter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mitarbeiter` ADD COLUMN `Username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Mitarbeiter_Username_key` ON `Mitarbeiter`(`Username`);
