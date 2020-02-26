import { TcpClientOptions, Transport } from '@nestjs/microservices';

export const EVENT_BUS_GLOBAL = 'BUS_GLOBAL';

export const EVENT_MODULE_OPTIONS: TcpClientOptions = {
  transport: Transport.TCP,
  options: {
    port: 3001,
  },
};
