import {Crud} from './crud';
import {UUID} from 'angular2-uuid';
import {Assignee} from './assignee';
import {assigneeData} from './DUMMY_DATA';


export class AssigneeService implements Crud<Assignee> {
  private assignees: Assignee[] = [];

  constructor() {

  }

  create(): Assignee {
    const newAssignee = new Assignee();
    newAssignee.id = UUID.UUID();
    return newAssignee;
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
    for ( const d of assigneeData ) {
      const dummy = this.create();
      dummy.id = d.id;
      dummy.nickname = d.nickname;
      this.put(dummy);
    }
  }
}
