import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { APPLICATION_DESCRIPTION, APPLICATION_TITLE } from './application/application.constants';
import { ApplicationModule } from './application/application.module';
import { EVENT_MODULE_OPTIONS } from './event/event.constants';

async function bootstrap () {
  const app = await NestFactory.create(ApplicationModule);
  app.connectMicroservice(EVENT_MODULE_OPTIONS);

  const configService = app.get(ConfigService);
  const port = configService.get('application.port');

  app.use(compression());
  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle(APPLICATION_TITLE)
    .setDescription(APPLICATION_DESCRIPTION)
    .setVersion(APPLICATION_DESCRIPTION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      operationsSorter: (a, b) => {
        return a.get('path').localeCompare(b.get('path'));
      },
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(port);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
