import { Module } from '@nestjs/common';
import { PdfSplitterService } from './pdf-splitter.service';

@Module({
  imports: [],
  providers: [PdfSplitterService],
})
export class PdfSplitterModule {}
