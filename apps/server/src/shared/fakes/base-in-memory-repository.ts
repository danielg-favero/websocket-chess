import { IBaseInMemoryRepository } from "./base-in-memory-repository.types";

export abstract class BaseInMemoryRepository<
  T extends { id: string },
> implements IBaseInMemoryRepository<T> {
  protected items: Map<string, T> = new Map();

  async create(item: T): Promise<T> {
    this.items.set(item.id, item);
    return item;
  }

  async find(id: string): Promise<T | undefined> {
    return this.items.get(id);
  }

  async delete(id: string): Promise<void> {
    this.items.delete(id);
  }

  async update(id: string, item: T): Promise<T | undefined> {
    if (!this.items.has(id)) {
      return undefined;
    }

    this.items.set(id, item);

    return item;
  }
}
