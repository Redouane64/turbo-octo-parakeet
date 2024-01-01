import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { IJob, IJobReply } from './interfaces';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(@Inject('JOBS_SERVICE') private client: ClientProxy) {}

  @Get('healthz')
  health(@Res() response: Response) {
    return response.status(HttpStatus.OK).send({ service: 'M1', ok: true });
  }

  @Post()
  async createJob(@Query('n', ParseIntPipe) n: number) {
    const reply = await firstValueFrom(
      this.client
        .send<IJobReply, IJob>('JOB', {
          n,
        }),
        /*
        N.B: add this op if timeout is desirable: `.pipe(timeout(30000))`,
        */
    );

    Logger.log(`Job completed with reply: ${JSON.stringify(reply)}`);

    return reply;
  }
}
