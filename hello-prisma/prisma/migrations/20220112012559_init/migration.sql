/*
  Warnings:

  - A unique constraint covering the columns `[Nachname]` on the table `Mitarbeiter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Mitarbeiter_Nachname_key` ON `Mitarbeiter`(`Nachname`);
