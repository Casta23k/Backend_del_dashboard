-- CreateTable
CREATE TABLE `ParcelaEliminada` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `responsable` VARCHAR(191) NOT NULL,
    `tipo_cultivo` VARCHAR(191) NOT NULL,
    `ultimo_riego` DATETIME(3) NOT NULL,
    `fechaEliminada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
