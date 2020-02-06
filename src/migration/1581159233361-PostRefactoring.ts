import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1581159233361 implements MigrationInterface {
  name = 'PostRefactoring1581159233361';

  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user` ADD UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`)', undefined);
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user` DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed`', undefined);
  }
}
