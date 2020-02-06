import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export default registerAs('database', () => ({
  host: process.env.TYPEORM_HOST || 'localhost',
  port: process.env.TYPEORM_PORT || 3306,
  name: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
}));

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor (private readonly configService: ConfigService) {}

  createTypeOrmOptions (): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.name'),
      entities: [
        path.join(__dirname, '../**/*.entity{.ts,.js}'),
      ],
      synchronize: false,
      migrationsRun: true,
      migrations: [
        path.join(__dirname, '../migration/*{.ts,.js}'),
      ],
    };
  }
}
