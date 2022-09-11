export abstract class IStorage {
  abstract getObject(path: string): Promise<Uint8Array>;

  abstract putObject(path: string, data: Uint8Array): Promise<void>;
}
