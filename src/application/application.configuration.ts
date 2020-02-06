import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

const ConfigurationSchema = Joi.object({
  BASE_URL: Joi.string()
    .uri()
    .required(),

  PORT: Joi.number()
    .default(3000),
});

export const ApplicationConfiguration = registerAs('application', () => {
  const { error, value: validatedConfig } = ConfigurationSchema.validate(process.env, {
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Application configuration validation error: ${error.message}`);
  }

  return {
    base_url: validatedConfig.BASE_URL,
    port: validatedConfig.PORT,
  };
});
