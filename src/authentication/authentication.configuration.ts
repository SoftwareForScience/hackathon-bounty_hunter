import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

/**
 * Source: https://github.com/zeit/ms/blob/d1add60365fe2340b750b1f7a254b83bea34e52d/index.js#L53
 */
const ZEIT_MS_MATCHER = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i;

const ConfigurationSchema = Joi.object({

  GITHUB_LOGIN_ENABLED: Joi.boolean()
    .required(),

  GITHUB_CLIENT_ID: Joi.string()
    .when('GITHUB_LOGIN_ENABLED', { is: true, then: Joi.required(), otherwise: Joi.optional() }),

  GITHUB_CLIENT_SECRET: Joi.string()
    .when('GITHUB_LOGIN_ENABLED', { is: true, then: Joi.required(), otherwise: Joi.optional() }),

  JWT_SECRET: Joi.string()
    .required(),

  JWT_EXPIRE_TIME: Joi.string()
    .pattern(ZEIT_MS_MATCHER)
    .default('1d'),
});

export const AuthenticationConfiguration = registerAs('authentication', () => {
  const { error, value: validatedConfig } = ConfigurationSchema.validate(process.env, {
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Authentication configuration validation error: ${error.message}`);
  }

  return {
    github_login_enabled: validatedConfig.GITHUB_LOGIN_ENABLED,
    github_client_id: validatedConfig.GITHUB_CLIENT_ID,
    github_client_secret: validatedConfig.GITHUB_CLIENT_SECRET,
    jwt_secret: validatedConfig.JWT_SECRET,
    jwt_expire_time: validatedConfig.JWT_EXPIRE_TIME,
  };
});

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor (private readonly configService: ConfigService) {}

  createJwtOptions (): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('authentication.jwt_secret'),
      signOptions: {
        expiresIn: this.configService.get<string>('authentication.jwt_expire_time'),
      },
    };
  }
}
