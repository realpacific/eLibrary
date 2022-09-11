import { NestFactory } from '@nestjs/core';
import { PdfSplitterModule } from './pdf-splitter.module';
import {
  CONFIG_FULL,
  CONFIG_PREVIEW,
  PdfSplitterService,
} from './pdf-splitter.service';
import { join, parse } from 'path';
import { writeFileSync, readFileSync } from 'fs';

function generateFileName(input: string, suffix: string) {
  const { ext, name } = parse(input);
  return `${name}__${suffix}${ext}`;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(PdfSplitterModule, {
    logger: ['error'],
  });
  const input = 'test-pdf.pdf';

  const srcFile = readFileSync(input);

  const [previewResult, fullResult] = await app
    .get(PdfSplitterService)
    .splitPdf(srcFile, [CONFIG_PREVIEW, CONFIG_FULL]);

  writeFileSync(
    join('temp', generateFileName(input, 'preview')),
    previewResult,
  );
  writeFileSync(join('temp', generateFileName(input, 'full')), fullResult);
}

bootstrap();
