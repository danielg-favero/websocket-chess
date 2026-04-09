export interface IBaseInMemoryRepository<T> {
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T | undefined>;
  delete(id: string): Promise<void>;
  find(id: string): Promise<T | undefined>;
}
