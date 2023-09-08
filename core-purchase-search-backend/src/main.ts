import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RootModule } from './modules/Global/Modules/RootModule';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  await app.listen(3000);
}

bootstrap().then(() => console.log('NestJS server started. PORT :' + 3000));
