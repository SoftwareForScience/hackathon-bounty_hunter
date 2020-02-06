import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1581089678855 implements MigrationInterface {
  name = 'PostRefactoring1581089678855';

  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE `user`', undefined);
  }
}
