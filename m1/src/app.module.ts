import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register({
      isGlobal: true,
      clients: [
        {
          transport: Transport.RMQ,
          name: 'JOBS_SERVICE',
          options: {
            urls: [process.env.RMQ_URL],
            queue: process.env.RMQ_QUEUE,
          },
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
