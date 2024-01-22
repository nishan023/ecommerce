/*
  Warnings:

  - The `is_admin` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_admin",
ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false;
