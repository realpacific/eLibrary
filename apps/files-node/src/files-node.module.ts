import { Module } from '@nestjs/common';
import { FilesNodeController } from './files-node.controller';
import { FilesNodeService } from './files-node.service';

@Module({
  imports: [],
  controllers: [FilesNodeController],
  providers: [FilesNodeService],
})
export class FilesNodeModule {}
