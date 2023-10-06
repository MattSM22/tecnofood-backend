-- DropForeignKey
ALTER TABLE `meal` DROP FOREIGN KEY `Meal_student_rm_fkey`;

-- AddForeignKey
ALTER TABLE `Meal` ADD CONSTRAINT `Meal_student_rm_fkey` FOREIGN KEY (`student_rm`) REFERENCES `Student`(`rm_aluno`) ON DELETE RESTRICT ON UPDATE CASCADE;
