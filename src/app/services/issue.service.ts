import {Crud} from './crud';
import {UUID} from 'angular2-uuid';
import {Issue} from './issue';
import {SprintService} from './sprint.service';
import {Injectable} from '@angular/core';
import {DateUtil} from '../utils/date.util';
import {issueData} from './DUMMY_DATA';
import {IssuePriority, IssueState, IssueType} from './Enums';
import {PersistenceService} from './persistence.service';


export function filterdByType(issueType: IssueType) {
  return issue => issue.type === issueType;
}

export function filteredBySprintId(sprintId: string) {
  return issue => issue.sprintId === sprintId;
}

export function filteredByState(issueState: IssueState) {
  return issue => issue.state === issueState;
}

export function filteredByAssignee(assigneeId: string) {
  return issue => issue.assigneeId === assigneeId;
}

@Injectable({
  // we declare that this service should be created by the root application injector.
  providedIn: 'root',
})
export class IssueService implements Crud<Issue> {
  private issues: Issue[] = [];

  private dateUtil = new DateUtil();

  constructor(private sprintService: SprintService, private persistence: PersistenceService) {
    this.persistence.loadIssues().then(issues => {
      this.issues = issues;
    });
  }

  create(): Issue {
    const newIssue = new Issue();
    newIssue.id = UUID.UUID();
    newIssue.creationDate = this.dateUtil.now();
    // defaults
    newIssue.type = IssueType.story;
    newIssue.state = IssueState.open;
    newIssue.priority = IssuePriority.medium;
    // newIssue.assigneeId = TODO: unassigned setzten
    return newIssue;
  }

  getAll(): Issue[] {
    return this.issues;
  }

  get(id: string): Issue {
    return this.issues.find(i => i.id === id);
  }

  put(issue: Issue): void {
    this.persistence.upsertIssue(issue)
      .then(() => {
        if (this.get(issue.id) === undefined) {
          return this.issues.push(issue);
        }
      })
      .catch(e => console.error(e));
  }

  delete(id: string): void {
    if (!this.isDeletionIssueAllowed(this.get(id))) {
      throw new Error('Deletion is not allowed because of sprint assignment.');
    }
    this.persistence.deleteIssue(id)
      .then(() => {
        const index = this.issues.findIndex(i => i.id === id);
        this.issues.splice(index, 1);
      })
      .catch(e => console.error(e));
  }

  getAllFiltered(predicate: (issue) => boolean): Issue[] {
    return this.issues.filter(predicate);
  }

  getAllFilteredByState(issueState: IssueState): Issue[] {
    return this.issues.filter(filteredByState(issueState));
  }

  getAllFilteredByType(issueType: IssueType): Issue[] {
    return this.issues.filter(filterdByType(issueType));
  }

  getAllFilteredBySprint(sprintId: string): Issue[] {
    return this.issues.filter(filteredBySprintId(sprintId));
  }

  getAllNotClosed(): Issue[] {
    return this.issues.filter(issure => issure.state !== IssueState.done);
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
    const issues: Issue[] = [];
    for (const d of issueData) {
      const dummy = this.create();
      dummy.title = d.title;
      dummy.description = d.description;
      dummy.priority = d.priority;
      dummy.type = d.type;
      dummy.state = d.state;
      dummy.sprintId = d.sprintId;
      dummy.assigneeId = d.assigneeID;
      dummy.creationDate = d.creationDate;
      dummy.dueDate = d.dueDate;
      dummy.estimated = d.estimated;
      dummy.elapsed = d.elapsed;
      dummy.highlighting = d.highlighting;
      dummy.resolution = d.resolution;
      dummy.resolutionDate = d.resolutionDate;
      dummy.comments = d.comments;
      dummy.issueLinks = d.issueLinks;
      dummy.subissues = d.subissues;
      issues.push(dummy);
    }
    this.persistence.storeIssues(issues)
      .then(r => console.log(r))
      .catch(e => console.error(e));
  }
}
