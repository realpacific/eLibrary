import { NestFactory } from '@nestjs/core';
import { PdfSplitterModule } from './pdf-splitter.module';
import {
  CONFIG_FULL,
  CONFIG_PREVIEW,
  PdfSplitterService,
} from './pdf-splitter.service';
import { join, parse } from 'path';
import { IStorageService } from '@infra/infra';

function generateFileName(input: string, suffix: string) {
  const { ext, name } = parse(input);
  return `${name}__${suffix}${ext}`;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(PdfSplitterModule, {
    logger: ['error'],
  });
  const storage: IStorageService = app.get(IStorageService);

  const input = 'test-pdf.pdf';

  const srcFile = await storage.getObject(input);

  const [previewResult, fullResult] = await app
    .get(PdfSplitterService)
    .splitPdf(new Buffer(srcFile.buffer), [CONFIG_PREVIEW, CONFIG_FULL]);

  await storage.putObject(
    join('temp', generateFileName(input, 'preview')),
    previewResult,
  );
  await storage.putObject(
    join('temp', generateFileName(input, 'full')),
    fullResult,
  );
}

bootstrap();
