-- CreateTable
CREATE TABLE `Parcela` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `responsable` VARCHAR(191) NOT NULL,
    `tipo_cultivo` VARCHAR(191) NOT NULL,
    `ultimo_riego` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoricoSensor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `temperatura` DOUBLE NOT NULL,
    `humedad` DOUBLE NOT NULL,
    `lluvia` DOUBLE NOT NULL,
    `intensidad_solar` DOUBLE NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `parcelaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HistoricoSensor` ADD CONSTRAINT `HistoricoSensor_parcelaId_fkey` FOREIGN KEY (`parcelaId`) REFERENCES `Parcela`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
