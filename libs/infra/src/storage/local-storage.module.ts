import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { IStorageServiceToken } from './IStorageService';

@Module({
  providers: [
    {
      provide: IStorageServiceToken,
      useClass: LocalStorageService,
    },
  ],
  exports: [IStorageServiceToken],
})
export class LocalStorageModule {}
