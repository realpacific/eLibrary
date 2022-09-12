import { Test, TestingModule } from '@nestjs/testing';
import { FilesNodeController } from './files-node.controller';
import { FilesNodeService } from './files-node.service';

describe('FilesNodeController', () => {
  let appController: FilesNodeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FilesNodeController],
      providers: [FilesNodeService],
    }).compile();

    appController = app.get<FilesNodeController>(FilesNodeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {});
  });
});
