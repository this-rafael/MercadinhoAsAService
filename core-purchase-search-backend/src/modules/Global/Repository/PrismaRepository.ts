import { Injectable, OnModuleInit } from '@nestjs/common';

import { DatabaseORM } from '../Intefaces/IPrisma';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaRepository
  extends PrismaClient
  implements OnModuleInit, DatabaseORM<PrismaClient>
{
  async onModuleInit() {
    await this.$connect();
  }

  connection(): Promise<PrismaClient> {
    return Promise.resolve(this);
  }
}
