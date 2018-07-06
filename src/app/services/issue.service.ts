import {Crud} from './crud';
import {UUID} from 'angular2-uuid';
import {Issue} from './issue';
import {IssueType} from './issueType';
import {IssuePriority} from './issuePriority';
import {IssueState} from './issueState';
import {SprintService} from './sprint.service';
import {Injectable} from '@angular/core';
import {DateUtil} from '../utils/date.util';
import {IssueResolution} from './issueResolution';


@Injectable({
  // we declare that this service should be created by the root application injector.
  providedIn: 'root',
})


export class IssueService implements Crud<Issue> {
  private issues: Issue[] = [];
  private sprintService: SprintService;

  private dateUtil = new DateUtil();

  constructor(sprintService: SprintService) {
    this.sprintService = sprintService;
  }

  create(): Issue {
    const newIssue = new Issue();
    newIssue.id = UUID.UUID();
    newIssue.state = IssueState.open;
    newIssue.creationDate = this.dateUtil.now();
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
    if (!this.isDeletionIssueAllowed(this.get(id))) {
      throw new Error('Deletion is not allowed because of sprint assignment.');
    }
    const index = this.issues.findIndex(i => i.id === id);
    this.issues.splice(index, 1);
  }

  getAllFilteredByState(issueState: IssueState): Issue[] {
    return this.issues.filter(issue => issue.state === issueState);
  }


  getAllNotClosed(): Issue[] {
    return this.issues.filter(issure => issure.state !== IssueState.done);
  }

  getAllFilteredByType(issueType: IssueType): Issue[] {
    return this.issues.filter(issue => issue.type === issueType); // TODO sbs evt. predicate auslagern
  }

  getAllFilteredBySprint(sprintId: string): Issue[] {
    return this.issues.filter(issue => issue.sprintId === sprintId);
  }

  getAllWithoutSprintAssignment(): Issue[] {
    return this.issues.filter(issure => issure.sprintId === undefined);
  }

  isDeletionIssueAllowed(issue: Issue): boolean {
    return !issue.sprintId;
  }

  isMutationIssueAllowed(issue: Issue): boolean {
    return this.sprintService.isSprintAlreadyStarted(issue.sprintId);
  }

  setupDummyData() {
    const i1 = this.create();
    i1.title = 'No beer avaliable';
    i1.description = 'Make sure there\'s enough beer every Saturday night';
    i1.priority = IssuePriority.blocker;
    i1.type = IssueType.task;
    i1.state = IssueState.open;
    i1.sprintId = this.sprintService.getLatest().id;
    i1.creationDate = this.sprintService.getLatest().begin.subtract(8, 'd');
    this.put(i1);
    const i2 = this.create();
    i2.title = 'Missing Chips';
    i2.description = 'Enough chips is quite important';
    i2.priority = IssuePriority.high;
    i2.type = IssueType.task;
    i2.state = IssueState.open;
    i2.sprintId = this.sprintService.getLatest().id;
    i2.creationDate = this.sprintService.getLatest().begin.subtract(3, 'd');
    this.put(i2);
    const i3 = this.create();
    i3.title = 'Testing';
    i3.description = 'Don\'t forget to write some tests';
    i3.priority = IssuePriority.high;
    i3.type = IssueType.task;
    i3.state = IssueState.inwork;
    i3.sprintId = undefined;
    i3.creationDate = this.sprintService.getLatest().begin.subtract(5, 'd');
    this.put(i3);
    const i4 = this.create();
    i4.title = 'Having Party';
    i4.description = 'Have a big party after project';
    i4.priority = IssuePriority.medium;
    i4.type = IssueType.story;
    i4.state = IssueState.open;
    i4.sprintId = undefined;
    i4.creationDate = this.sprintService.getLatest().begin.subtract(12, 'd');
    this.put(i4);
    const i5 = this.create();
    i5.title = 'Bug 1';
    i5.description = '...';
    i5.priority = IssuePriority.blocker;
    i5.type = IssueType.bug;
    i5.state = IssueState.intest;
    i5.sprintId = this.sprintService.getLatest().id;
    i5.creationDate = this.sprintService.getLatest().begin.subtract(8, 'd');
    this.put(i5);
    const i6 = this.create();
    i6.title = 'Story 1';
    i6.description = '...';
    i6.priority = IssuePriority.high;
    i6.type = IssueType.story;
    i6.state = IssueState.done;
    i6.sprintId = this.sprintService.getLatest().id;
    i6.creationDate = this.sprintService.getLatest().begin.subtract(3, 'd');
    i6.resolution = IssueResolution.fixed;
    i6.resolutionDate = this.sprintService.getLatest().end.subtract(5, 'd');
    this.put(i6);
  }
}
