import { Controller, Get, HttpStatus, Logger, Res } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext, Transport } from '@nestjs/microservices';
import { IJob } from './interfaces';
import { setTimeout } from 'timers/promises';
import { Response } from 'express';

@Controller()
export class AppController {

  @Get('healthz')
  health(@Res() response: Response) {
    return response.sendStatus(HttpStatus.OK);
  }
  
  @MessagePattern('JOB', Transport.RMQ)
  async handleJob(@Payload() payload: IJob, @Ctx() context: RmqContext) {
    Logger.log(`Processing job...`)
    const double = await setTimeout(5000, payload.n * payload.n);
    return { n: payload.n, double };
  }
}
