import { Module } from '@nestjs/common';
import { DatabaseModule } from './DatabaseModule';
import { ProductModule } from '../../Products/Infra/Modules/ProductModule';
import { GraphqlModuleGenerator } from './GraphqlModule';

@Module({
  imports: [GraphqlModuleGenerator(), DatabaseModule, ProductModule],
  exports: [DatabaseModule],
})
export class RootModule {}
