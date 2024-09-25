-- AlterTable
ALTER TABLE `Todos` ADD COLUMN `authorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Todos` ADD CONSTRAINT `Todos_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
