import { MigrationInterface, QueryRunner } from 'typeorm';

export class Student1582800021734 implements MigrationInterface {
  name = 'Student1582800021734';

  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `task` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `discription` varchar(255) NOT NULL, `ecs` int NOT NULL, `status` varchar(255) NOT NULL, `studentId` int NULL, `assessorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
    await queryRunner.query('ALTER TABLE `task` ADD CONSTRAINT `FK_330dd8fc7bd42a43c74035cf405` FOREIGN KEY (`studentId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE `task` ADD CONSTRAINT `FK_32b6143ea337cfdf66177024399` FOREIGN KEY (`assessorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `task` DROP FOREIGN KEY `FK_32b6143ea337cfdf66177024399`', undefined);
    await queryRunner.query('ALTER TABLE `task` DROP FOREIGN KEY `FK_330dd8fc7bd42a43c74035cf405`', undefined);
    await queryRunner.query('DROP TABLE `task`', undefined);
  }
}
