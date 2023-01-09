/*
  Warnings:

  - You are about to drop the column `category_id` on the `exercises` table. All the data in the column will be lost.
  - Added the required column `category_name` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_category_id_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "category_id",
ADD COLUMN     "category_name" TEXT NOT NULL;
