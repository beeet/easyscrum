import {Issue} from './issue';

export interface Crud {
  create(): Issue;

  getAll(): Issue[];

  get(id: string);

  put(issue: Issue);

  delete(id: string);
}
