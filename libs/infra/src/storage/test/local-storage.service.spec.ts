import { Test, TestingModule } from '@nestjs/testing';
import { IStorageService, LocalStorageModule } from '@infra/infra';
import * as fs from 'fs';

const fileName = 'test.txt';

describe('LocalStorageService test', () => {
  let storage: IStorageService;

  beforeEach(async () => {
    try {
      await fs.promises.rm(fileName);
    } catch (e) {}
    const module: TestingModule = await Test.createTestingModule({
      imports: [LocalStorageModule],
    }).compile();

    storage = module.get<IStorageService>(IStorageService);
  });

  afterAll(async () => {
    await fs.promises.rm(fileName);
  });

  it('should be stored in file system and be readable', async () => {
    expect(storage).toBeDefined();
    const content = new Uint8Array([1, 2, 3, 45]);
    await storage.putObject(fileName, content);
    const file = await storage.getObject(fileName);
    expect(file).toBeDefined();
    // https://masteringjs.io/tutorials/node/buffer-compare
    expect(
      Buffer.compare(Buffer.from(content.buffer), Buffer.from(file.buffer)),
    ).toEqual(0); // 0, means the 2 buffers are equal
  });
});
