import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateDatabase1581157575136 implements MigrationInterface {
  name = 'PopulateDatabase1581157575136';

  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('INSERT INTO `user` (`username`, `password`) VALUES (\'admin\', \'admin\');');
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DELETE FROM `user` WHERE `username`=\'admin\';');
  }
}
