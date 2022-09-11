import { Module } from '@nestjs/common';
import { PdfSplitterService } from './pdf-splitter.service';
import { LocalStorageModule } from '@infra/infra';

@Module({
  imports: [LocalStorageModule],
  providers: [PdfSplitterService],
})
export class PdfSplitterModule {}
