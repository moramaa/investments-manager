/*
  Warnings:

  - The primary key for the `Invest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `Invest` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Invest` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Invest` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Invest` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name2` on the `User` table. All the data in the column will be lost.
  - Added the required column `startDateOfInvest` to the `Invest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Invest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invest" DROP CONSTRAINT "Invest_pkey",
DROP COLUMN "content",
DROP COLUMN "id",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "annualManagementFees" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "initialInvestment" INTEGER DEFAULT 0,
ADD COLUMN     "insuranceCompany" TEXT,
ADD COLUMN     "investmentID" SERIAL NOT NULL,
ADD COLUMN     "investmentName" TEXT NOT NULL DEFAULT 'investment',
ADD COLUMN     "investmentProduced" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "monthlyDeposit" INTEGER DEFAULT 0,
ADD COLUMN     "monthlyManagementFees" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "startDateOfInvest" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "yearsOfInvestment" INTEGER DEFAULT 0,
ADD CONSTRAINT "Invest_pkey" PRIMARY KEY ("investmentID");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "name2",
ADD COLUMN     "AverageSalary" INTEGER,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;
