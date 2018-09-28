export interface Crud<T> {
  create(): T;

  getAll(): T[];

  get(id: string): T;

  put(item: T): void;

  delete(id: string): void;
}
