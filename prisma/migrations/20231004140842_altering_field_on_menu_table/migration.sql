/*
  Warnings:

  - You are about to drop the column `principal_entrace` on the `menu` table. All the data in the column will be lost.
  - Added the required column `principal_entrance` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `principal_entrace`,
    ADD COLUMN `principal_entrance` VARCHAR(191) NOT NULL;
