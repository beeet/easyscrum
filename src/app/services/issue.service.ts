import {UUID} from 'angular2-uuid';
import {Issue} from './issue';
import {IssueType} from './issueType';
import {IssuePriority} from './issuePriority';
import {Crud} from './crud';
import {IssueState} from './issueState';

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
    if (this.get(issue.id) === undefined) {
      return this.issues.push(issue);
    } else {
      return -1;
    }
  }

  delete(id: string): void {
    const index = this.issues.findIndex(i => i.id === id);
    this.issues.splice(index, 1);
  }

  getAllFilteredByState(issueState: IssueState): Issue[] {
    return this.issues.filter(issue => issue.state === issueState);
  }

  getAllFilteredByType(issueType: IssueType): Issue[] {
    return this.issues.filter(issue => issue.type === issueType);
  }

  getAllWithoutSprintAssignment(): Issue[] {
    return this.issues.filter(issure => issure.sprintId === undefined);
  }

  setupDummyData() {
    const i1 = new Issue();
    i1.id = '98769967-0176-3914-a09b-061dad1e7024';
    i1.title = 'No beer avaliable';
    i1.description = 'Make sure there\'s enough beer every Saturday night';
    i1.priority = IssuePriority.blocker;
    i1.type = IssueType.task;
    i1.state = IssueState.open;
    this.issues.push(i1);
    const i2 = new Issue();
    i2.id = '601597b7-0e96-bca5-0bce-ed7253040c8a';
    i2.title = 'Missing Chips';
    i2.description = 'Enough chips is quite important';
    i2.priority = IssuePriority.high;
    i2.type = IssueType.task;
    i2.state = IssueState.open;
    this.issues.push(i2);
    const i3 = new Issue();
    i3.id = 'd0a01a96-8234-dd5b-b1fe-f48ec3c6f925';
    i3.title = 'Testing';
    i3.description = 'Don\'t forget to write some tests';
    i3.priority = IssuePriority.high;
    i3.type = IssueType.task;
    i3.state = IssueState.inwork;
    this.issues.push(i3);
  }
}
