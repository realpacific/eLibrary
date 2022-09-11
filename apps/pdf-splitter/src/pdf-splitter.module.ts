import { Module } from '@nestjs/common';
import { PdfSplitterService } from './pdf-splitter.service';
import { LocalStorageModule } from '@infra/infra';
import { ConfigModule } from '@nestjs/config';
import { PdfSplitterConfig } from './configuration';

@Module({
  imports: [
    LocalStorageModule,
    ConfigModule.forRoot({
      cache: true,
      load: [
        () => {
          return {
            previewPageSize: parseInt(process.env.PREVIEW_PAGE_SIZE, 10) || 10,
          } as PdfSplitterConfig;
        },
      ],
    }),
  ],
  providers: [PdfSplitterService],
})
export class PdfSplitterModule {}
