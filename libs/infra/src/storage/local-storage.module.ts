import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { IStorageService } from './IStorageService';

@Module({
  providers: [
    {
      provide: IStorageService,
      useClass: LocalStorageService,
    },
    LocalStorageService,
  ],
})
export class LocalStorageModule {}
