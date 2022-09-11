import { Module } from '@nestjs/common';
import { PdfSplitterService } from './pdf-splitter.service';
import { LocalStorageService, IStorage } from '@infra/infra';

@Module({
  imports: [],
  providers: [
    PdfSplitterService,
    {
      provide: IStorage,
      useClass: LocalStorageService,
    },
  ],
})
export class PdfSplitterModule {}
