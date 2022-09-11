import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesNodeService } from './files-node.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileRequest } from './models/UploadFileRequest';
import { Express } from 'express';

@Controller()
export class FilesNodeController {
  constructor(private readonly service: FilesNodeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() body: UploadFileRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.service.uploadFile(body, file);
    return {
      body,
    };
  }
}
