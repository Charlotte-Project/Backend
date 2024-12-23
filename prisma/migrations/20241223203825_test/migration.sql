/*
  Warnings:

  - You are about to drop the column `is_first_login` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_first_login",
ALTER COLUMN "is_email_confirmed" SET DEFAULT true;
