import { Module } from '@nestjs/common';
import { FilesNodeController } from './files-node.controller';
import { FilesNodeService } from './files-node.service';
import { LocalStorageModule } from '@infra/infra';

@Module({
  imports: [LocalStorageModule],
  controllers: [FilesNodeController],
  providers: [FilesNodeService],
})
export class FilesNodeModule {}
