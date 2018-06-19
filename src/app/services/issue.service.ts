import {UUID} from 'angular2-uuid';
import {Issue} from './issue';
import {IssueType} from './issueType';
import {IssuePriority} from './IssuePriority';
import {Crud} from './crud';

export class IssueService implements Crud {

  private issues: Issue[] = [];

  constructor() {

  }

  create(): Issue {
    const newIssue = new Issue();
    newIssue.id = UUID.UUID();
    return newIssue;
  }

  getAll(): Issue[] {
    return this.issues;
  }

  get(id: string): Issue {
    return this.issues.find(i => i.id === id);
  }

  put(issue: Issue): number {
    return this.issues.push(issue);
  }

  delete(id: string): void {
    const index = this.issues.findIndex(i => i.id === id);
    this.issues.splice(index, 1);
  }

  setupDummyData() {
    const i1 = new Issue();
    i1.id = '98769967-0176-3914-a09b-061dad1e7024';
    i1.title = 'No beer avaliable';
    i1.description = 'Make sure there\'s enough beer every Saturday night';
    i1.priority = IssuePriority.blocker;
    i1.type = IssueType.task;
    this.issues.push(i1);
    const i2 = new Issue();
    i2.id = '601597b7-0e96-bca5-0bce-ed7253040c8a';
    i2.title = 'Missing Chips';
    i2.description = 'Enough chips is quite important';
    i2.priority = IssuePriority.high;
    i2.type = IssueType.task;
    this.issues.push(i2);
  }
}
