import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server: express.Express = express();

async function bootstrap() {
  // Server
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();

  // Localhost
  // const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap();

export default server;
