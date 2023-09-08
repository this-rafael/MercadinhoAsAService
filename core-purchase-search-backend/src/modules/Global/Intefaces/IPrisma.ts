import { PrismaClient } from '@prisma/client';

export abstract class DatabaseORM<T extends object = PrismaClient> {
  abstract connection(): Promise<T>;
}
