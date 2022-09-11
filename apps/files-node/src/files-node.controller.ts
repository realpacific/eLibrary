import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesNodeService } from './files-node.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class FilesNodeController {
  constructor(private readonly service: FilesNodeService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.service.uploadFile();
    console.log(file);
  }
}
