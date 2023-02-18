import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { starter } from './starter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // starter(app);
  await app.listen(3000);
}
bootstrap();
