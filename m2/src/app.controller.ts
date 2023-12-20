import { Controller, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext, Transport } from '@nestjs/microservices';
import { IJob } from './interfaces';
import { setTimeout } from 'timers/promises';

@Controller()
export class AppController {

  @MessagePattern('JOB', Transport.RMQ)
  async handleJob(@Payload() payload: IJob, @Ctx() context: RmqContext) {
    Logger.log(`Processing job...`)
    const double = await setTimeout(5000, payload.n * payload.n);
    return { n: payload.n, double };
  }
}
