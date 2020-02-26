import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { EVENT_BUS_GLOBAL, EVENT_MODULE_OPTIONS } from './event.constants';

@Module({
  imports: [
    ClientsModule.register([
      { name: EVENT_BUS_GLOBAL, ...EVENT_MODULE_OPTIONS },
    ]),
  ],
  exports: [
    ClientsModule,
  ],
})
export class EventModule {}
