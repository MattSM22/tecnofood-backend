/*
  Warnings:

  - A unique constraint covering the columns `[student_rm]` on the table `Meal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Meal_student_rm_key` ON `Meal`(`student_rm`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_id_key` ON `Student`(`id`);
