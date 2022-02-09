/*
  Warnings:

  - You are about to drop the column `firma_ID` on the `mitarbeiter` table. All the data in the column will be lost.
  - You are about to drop the column `firma_ID` on the `rechnung` table. All the data in the column will be lost.
  - You are about to drop the `firma` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Firmenname` to the `Mitarbeiter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdmin` to the `Mitarbeiter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mitarbeiter` DROP FOREIGN KEY `Mitarbeiter_firma_ID_fkey`;

-- DropForeignKey
ALTER TABLE `rechnung` DROP FOREIGN KEY `Rechnung_firma_ID_fkey`;

-- AlterTable
ALTER TABLE `mitarbeiter` DROP COLUMN `firma_ID`,
    ADD COLUMN `Firmenname` VARCHAR(191) NOT NULL,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `rechnung` DROP COLUMN `firma_ID`;

-- DropTable
DROP TABLE `firma`;
