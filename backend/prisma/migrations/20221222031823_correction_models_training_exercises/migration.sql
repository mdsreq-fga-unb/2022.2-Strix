/*
  Warnings:

  - You are about to drop the column `training_id` on the `exercises` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_training_id_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "training_id";
