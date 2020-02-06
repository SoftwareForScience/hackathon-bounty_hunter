import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { StrategyValidateResponseDto } from '../dto';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('authentication.github_client_id'),
      clientSecret: configService.get<string>('authentication.github_client_secret'),
      callbackURL: `${configService.get<string>('application.base_url')}/auth/github/callback`,
    });
  }

  validate (_accessToken: string, _refreshToken: string, profile: Strategy.Profile): StrategyValidateResponseDto {
    return {
      userId: Number(profile.id),
      username: profile.username,
    };
  }
}
