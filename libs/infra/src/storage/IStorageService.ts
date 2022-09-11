export interface IStorageService {
  getObject(path: string): Promise<Uint8Array>;

  putObject(path: string, data: Uint8Array): Promise<void>;
}

export const IStorageService = Symbol('IStorageService');
