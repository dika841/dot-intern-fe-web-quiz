-- DropIndex
DROP INDEX `Account_userId_fkey` ON `Account`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
