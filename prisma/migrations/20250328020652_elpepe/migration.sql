/*
  Warnings:

  - You are about to drop the column `ubicacion` on the `parcela` table. All the data in the column will be lost.
  - You are about to drop the column `ubicacion` on the `parcelaeliminada` table. All the data in the column will be lost.
  - Added the required column `latitud` to the `Parcela` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitud` to the `Parcela` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitud` to the `ParcelaEliminada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitud` to the `ParcelaEliminada` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parcela` DROP COLUMN `ubicacion`,
    ADD COLUMN `latitud` DOUBLE NOT NULL,
    ADD COLUMN `longitud` DOUBLE NOT NULL,
    MODIFY `id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `parcelaeliminada` DROP COLUMN `ubicacion`,
    ADD COLUMN `latitud` DOUBLE NOT NULL,
    ADD COLUMN `longitud` DOUBLE NOT NULL;
