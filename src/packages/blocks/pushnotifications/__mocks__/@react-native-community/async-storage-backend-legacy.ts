import { EmptyStorageModel, IStorageBackend, StorageOptions } from "@react-native-community/async-storage";

export default class MockAsyncStorage<T = EmptyStorageModel> implements IStorageBackend<T> {

  private MOCK_STORAGE: T = {} as T;

  public async getSingle<K extends keyof T>(key: K, opts?: StorageOptions): Promise<T[K] | null> {
    const obj = await this.getMany<K>([key], opts);
    return obj[key] ?? null;
  }

  public async setSingle<K extends keyof T>(key: K, value: T[K], opts?: StorageOptions): Promise<void> {
    const obj = { [key]: value } as {[k in K]: T[k]};
    await this.setMany<K>([obj], opts);
  }

  public async getMany<K extends keyof T>(keys: Array<K>, _opts?: StorageOptions): Promise<{[k in K]: T[k] | null}> {
    return keys.reduce(
      (acc, key) => ({ ...acc, [key]: this.MOCK_STORAGE[key] ?? null }),
      {} as {[k in K]: T[k] | null}
    );
  }

  public async setMany<K extends keyof T>(values: Array<{[k in K]: T[k]}>, _opts?: StorageOptions): Promise<void> {
    values.forEach(value => {
      this.MOCK_STORAGE = {
        ...this.MOCK_STORAGE,
        ...value
      };
    });
  }

  public async removeSingle(key: keyof T, opts?: StorageOptions): Promise<void> {
    await this.removeMany([key], opts);
  }

  public async removeMany(keys: Array<keyof T>, _opts?: StorageOptions): Promise<void> {
    keys.forEach(key => {
      if (this.MOCK_STORAGE[key]) {
        delete this.MOCK_STORAGE[key];
      }
    });
  }

  public async getKeys(_opts?: StorageOptions): Promise<Array<keyof T>> {
    return Object.keys(this.MOCK_STORAGE) as Array<keyof T>;
  }

  public async dropStorage(_opts?: StorageOptions): Promise<void> {
    this.MOCK_STORAGE = {} as T;
  }
}