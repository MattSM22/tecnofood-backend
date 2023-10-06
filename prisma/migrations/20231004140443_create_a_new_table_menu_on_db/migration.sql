-- CreateTable
CREATE TABLE `Menu` (
    `id_cardapio` VARCHAR(191) NOT NULL,
    `base_plate` VARCHAR(191) NOT NULL,
    `principal_entrace` VARCHAR(191) NOT NULL,
    `guarnich` VARCHAR(191) NOT NULL,
    `fruit_salad` VARCHAR(191) NOT NULL,
    `calories` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `weekday` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Menu_id_cardapio_key`(`id_cardapio`),
    PRIMARY KEY (`id_cardapio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
