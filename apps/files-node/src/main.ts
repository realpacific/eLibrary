import { NestFactory } from '@nestjs/core';
import { FilesNodeModule } from './files-node.module';

async function bootstrap() {
  const app = await NestFactory.create(FilesNodeModule);
  await app.listen(3000);
}

bootstrap();
