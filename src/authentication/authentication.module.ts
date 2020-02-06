import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtConfigService } from './authentication.configuration';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { GithubStrategy } from './strategy/github.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  providers: [
    AuthenticationService,
    GithubStrategy,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    AuthenticationService,
    PassportModule,
  ],
  controllers: [
    AuthenticationController,
  ],
})
export class AuthenticationModule {}
