/*
  Warnings:

  - You are about to drop the column `training_id` on the `students` table. All the data in the column will be lost.
  - Added the required column `student_id` to the `training` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_training_id_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "training_id";

-- AlterTable
ALTER TABLE "training" ADD COLUMN     "student_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "training" ADD CONSTRAINT "training_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
