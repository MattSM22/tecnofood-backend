-- CreateTable
CREATE TABLE `Adm` (
    `id` VARCHAR(191) NOT NULL,
    `login_adm` VARCHAR(191) NOT NULL,
    `senha_adm` VARCHAR(191) NOT NULL,
    `super_user` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meal` (
    `id` VARCHAR(191) NOT NULL,
    `student_rm` VARCHAR(191) NOT NULL,
    `data_refeicao` DATETIME(3) NOT NULL,
    `qtd_refeicao` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` VARCHAR(191) NOT NULL,
    `rm_aluno` VARCHAR(191) NOT NULL,
    `nome_aluno` VARCHAR(191) NOT NULL,
    `modulo_aluno` VARCHAR(191) NOT NULL,
    `curso_aluno` VARCHAR(191) NOT NULL,
    `turno_aluno` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Meal` ADD CONSTRAINT `Meal_student_rm_fkey` FOREIGN KEY (`student_rm`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
