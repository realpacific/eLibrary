import { Injectable } from '@nestjs/common';
import { IStorageService } from './../IStorageService';
import * as fs from 'fs';

@Injectable()
export class LocalStorageService implements IStorageService {
  getObject(path: string): Promise<Uint8Array> {
    return fs.promises.readFile(path);
  }

  putObject(path: string, data: Uint8Array): Promise<void> {
    return fs.promises.writeFile(path, data);
  }
}
