import {Crud} from './crud';
import {UUID} from 'angular2-uuid';
import {Assignee} from './assignee';


export class AssigneeService implements Crud<Assignee> {
  private assignees: Assignee[] = [];

  constructor() {

  }

  create(): Assignee {
    const newAssignee = new Assignee();
    newAssignee.id = UUID.UUID();
    return newAssignee  ;
  }

  getAll(): Assignee[] {
    return this.assignees;
  }

  get(id: string) {
    return this.assignees.find(a => a.id === id);
  }

  put(assignee: Assignee) {
    return this.assignees.push(assignee);
  }

  delete(id: string) {
    const index = this.assignees.findIndex(a => a.id === id);
    this.assignees.splice(index, 1);
  }

  setupDummyData() {
    const a1 = this.create();
    a1.nickname = 'Adrian A.';
    this.put(a1);
    const a2 = this.create();
    a2.nickname = 'Beat B.';
    this.put(a2);
    const a3 = this.create();
    a3.nickname = 'Beat S.';
    this.put(a3);
  }
}
