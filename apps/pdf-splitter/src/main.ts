import { NestFactory } from '@nestjs/core';
import { PdfSplitterModule } from './pdf-splitter.module';
import { CONFIG_FULL, PdfSplitterService } from './pdf-splitter.service';
import { join, parse } from 'path';
import { IStorageService, IStorageServiceToken } from '@infra/infra';
import { ConfigService } from '@nestjs/config';
import { PdfSplitterConfig } from './configuration';

function generateFileName(input: string, suffix: string) {
  const { ext, name } = parse(input);
  return `${name}__${suffix}${ext}`;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(PdfSplitterModule, {
    logger: ['error'],
  });
  const storage = app.get<IStorageService>(IStorageServiceToken);
  const config = app.get<ConfigService<PdfSplitterConfig>>(ConfigService);

  const input = 'test-pdf.pdf';

  const srcFile = await storage.getObject(input);

  const [previewResult, fullResult] = await app
    .get(PdfSplitterService)
    .splitPdf(new Buffer(srcFile.buffer), [
      {
        pages: config.get<number>('previewPageSize'),
      },
      CONFIG_FULL,
    ]);

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
