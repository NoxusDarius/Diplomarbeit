/*
  Warnings:

  - You are about to drop the `fisttable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `fisttable`;

-- CreateTable
CREATE TABLE `Firma` (
    `Firmen_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Firmenname` VARCHAR(191) NOT NULL,
    `UID_Nummer` INTEGER NOT NULL,

    UNIQUE INDEX `Firma_Firmenname_key`(`Firmenname`),
    PRIMARY KEY (`Firmen_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
