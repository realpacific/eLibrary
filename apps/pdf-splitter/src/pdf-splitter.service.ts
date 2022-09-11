import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';

export interface SplitterConfig {
  pages?: number;
}

export const CONFIG_FULL: SplitterConfig = {
  pages: undefined,
} as const;

export const CONFIG_PREVIEW: SplitterConfig = {
  pages: 10,
} as const;

@Injectable()
export class PdfSplitterService {
  async splitPdf(
    buffer: Buffer,
    splitterConfig: Array<SplitterConfig>,
  ): Promise<Array<Uint8Array>> {
    const srcPdf = await PDFDocument.load(buffer);
    const length = srcPdf.getPageCount();

    return Promise.all(
      splitterConfig.map(async (config) => {
        const destPdf = await PDFDocument.create();

        const previewSize = Math.min(config.pages ?? length, length);

        const pages = await destPdf.copyPages(
          srcPdf,
          Array.from(Array(previewSize).keys()).map((value) => value),
        );
        pages.forEach((page) => {
          page.drawText('e-library', {
            size: 10,
            y: page.getHeight() - 10,
            x: page.getWidth() / 2 - 10,
          });
          destPdf.addPage(page);
        });

        return await destPdf.save();
      }),
    );
  }
}
