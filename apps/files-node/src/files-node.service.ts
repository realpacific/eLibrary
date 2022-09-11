import { Inject, Injectable } from '@nestjs/common';
import { IStorageServiceToken } from '@infra/infra';
import * as path from 'path';
import { UploadFileRequest } from './models/UploadFileRequest';
import { LocalStorageService } from '@infra/infra/storage/local-storage.service';

@Injectable()
export class FilesNodeService {
  constructor(
    @Inject(IStorageServiceToken)
    private storageService: LocalStorageService,
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
