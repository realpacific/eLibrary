import { Inject, Injectable } from '@nestjs/common';
import { IStorageService, IStorageServiceToken } from '@infra/infra';
import * as path from 'path';
import { UploadFileRequest } from './models/UploadFileRequest';

@Injectable()
export class FilesNodeService {
  constructor(
    @Inject(IStorageServiceToken) private storageService: IStorageService,
  ) {}

  async uploadFile(
    body: UploadFileRequest,
    file: Express.Multer.File,
  ): Promise<void> {
    return await this.storageService.putObject(
      path.join('temp', file.originalname),
      file.buffer,
    );
  }
}
