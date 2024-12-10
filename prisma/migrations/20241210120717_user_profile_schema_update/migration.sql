/*
  Warnings:

  - You are about to drop the column `availableFor` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentLearning` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentProject` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pronouns` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `work` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_username_password_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "availableFor",
DROP COLUMN "bio",
DROP COLUMN "currentLearning",
DROP COLUMN "currentProject",
DROP COLUMN "education",
DROP COLUMN "facebook",
DROP COLUMN "github",
DROP COLUMN "linkedin",
DROP COLUMN "location",
DROP COLUMN "pronouns",
DROP COLUMN "skills",
DROP COLUMN "twitter",
DROP COLUMN "website",
DROP COLUMN "work";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "location" TEXT,
    "currentLearning" TEXT,
    "availableFor" TEXT,
    "skills" TEXT,
    "currentProject" TEXT,
    "pronouns" BOOLEAN,
    "work" TEXT,
    "education" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "website" TEXT,
    "twitter" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "facebook" TEXT,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Social_userId_key" ON "Social"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
