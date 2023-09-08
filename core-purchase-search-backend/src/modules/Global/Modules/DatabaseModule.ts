import { Module } from '@nestjs/common';
import { DatabaseORM } from '../Intefaces/IPrisma';
import { PrismaRepository } from '../Repository/PrismaRepository';

import { GenerateModule, Injects } from 'strategy_nest';

@Module(
  GenerateModule({
    providers: [Injects.of(PrismaRepository).as(DatabaseORM)],
  }),
)
export class DatabaseModule {}
