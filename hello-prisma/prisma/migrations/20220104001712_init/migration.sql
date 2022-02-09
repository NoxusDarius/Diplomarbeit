-- CreateTable
CREATE TABLE `Mitarbeiter` (
    `Mitarbeiter_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Vorname` VARCHAR(191) NOT NULL,
    `Nachname` VARCHAR(191) NOT NULL,
    `firma_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Mitarbeiter_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rechnung` (
    `Rechnungs_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Firmenname_Kauf` VARCHAR(191) NOT NULL,
    `Datum_Kauf` DATETIME(3) NOT NULL,
    `Betrag` DECIMAL(65, 30) NOT NULL,
    `Steuersatz` INTEGER NOT NULL,
    `firma_ID` INTEGER NOT NULL,
    `mitarbeiter_id` INTEGER NOT NULL,

    PRIMARY KEY (`Rechnungs_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rechnungsbild` (
    `Bild_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Bild_unbearbeitet` INTEGER NOT NULL,
    `Bild_bearbeitet` INTEGER NOT NULL,
    `rechnungs_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Bild_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mitarbeiter` ADD CONSTRAINT `Mitarbeiter_firma_ID_fkey` FOREIGN KEY (`firma_ID`) REFERENCES `Firma`(`Firmen_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rechnung` ADD CONSTRAINT `Rechnung_firma_ID_fkey` FOREIGN KEY (`firma_ID`) REFERENCES `Firma`(`Firmen_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rechnung` ADD CONSTRAINT `Rechnung_mitarbeiter_id_fkey` FOREIGN KEY (`mitarbeiter_id`) REFERENCES `Mitarbeiter`(`Mitarbeiter_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rechnungsbild` ADD CONSTRAINT `Rechnungsbild_rechnungs_ID_fkey` FOREIGN KEY (`rechnungs_ID`) REFERENCES `Rechnung`(`Rechnungs_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
