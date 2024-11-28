-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER');

-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'Canceled';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roles" "Roles"[] DEFAULT ARRAY['USER']::"Roles"[];

-- DropEnum
DROP TYPE "RelatedTable";

-- CreateTable
CREATE TABLE "tokens" (
    "token" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
