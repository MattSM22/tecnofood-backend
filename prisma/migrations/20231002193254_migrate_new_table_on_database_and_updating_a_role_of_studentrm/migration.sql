/*
  Warnings:

  - A unique constraint covering the columns `[rm_aluno]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `MealPrevisionTable` (
    `id` VARCHAR(191) NOT NULL,
    `student_rm` VARCHAR(191) NOT NULL,
    `date_assignment` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MealPrevisionTable_id_key`(`id`),
    UNIQUE INDEX `MealPrevisionTable_student_rm_key`(`student_rm`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Student_rm_aluno_key` ON `Student`(`rm_aluno`);

-- AddForeignKey
ALTER TABLE `MealPrevisionTable` ADD CONSTRAINT `MealPrevisionTable_student_rm_fkey` FOREIGN KEY (`student_rm`) REFERENCES `Student`(`rm_aluno`) ON DELETE RESTRICT ON UPDATE CASCADE;
