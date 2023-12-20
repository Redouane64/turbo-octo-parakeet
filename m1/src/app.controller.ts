import {
  Controller,
  Inject,
  Logger,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { IJob, IJobReply } from './interfaces';

@Controller()
export class AppController {
  constructor(@Inject('JOBS_SERVICE') private client: ClientProxy) {}

  @Post()
  async createJob(@Query('n', ParseIntPipe) n: number) {
    const reply = await firstValueFrom(
      this.client
        .send<IJobReply, IJob>('JOB', {
          n,
        })
        .pipe(timeout(10000)),
    );

    Logger.log(`Job completed with reply: ${JSON.stringify(reply)}`);

    return reply;
  }
}
