import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { ApplicationModule } from './application/application.module';

async function bootstrap () {
  const app = await NestFactory.create(ApplicationModule);
  const configService = app.get(ConfigService);

  app.use(compression());
  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle('bounty system')
    .setDescription('The API description for the bounty system')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('application.port');
  await app.listen(port);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
