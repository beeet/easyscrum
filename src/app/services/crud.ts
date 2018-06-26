import {Issue} from './issue';

export interface Crud<T> {
  create(): T;

  getAll(): T[];

  get(id: string);

  put(item: T);

  delete(id: string);
}
