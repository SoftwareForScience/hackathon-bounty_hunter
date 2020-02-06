import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationConfiguration } from '../authentication/authentication.configuration';
import { AuthenticationModule } from '../authentication/authentication.module';
import database, { TypeOrmConfigService } from '../config/database.config';
import { ApplicationConfiguration } from './application.configuration';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({
      load: [
        ApplicationConfiguration,
        AuthenticationConfiguration,
        database,
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [
    ApplicationController,
  ],
  providers: [
    ApplicationService,
  ],
})
export class ApplicationModule {}
