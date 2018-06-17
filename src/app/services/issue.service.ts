import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})

export class Issue { // TODO extract to own class incl enums
  private _id: string;
  private _title: string;
  private _description: string;
  private _type: IssueType;
  private _priority: IssuePriority;

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
  public get type(): IssueType {
    return this._type;
  }
  public set type(value: IssueType) {
    this._type = value;
  }
  public get priority(): IssuePriority {
    return this._priority;
  }
  public set priority(value: IssuePriority) {
    this._priority = value;
  }
}

export enum IssueType {
  story = 'S',
  bug = 'B',
  task = 'T'
}

export enum IssuePriority {
  blocker = '1',
  high = '2',
  medium = '3',
  low = '4'
}

export interface Crud { // TODO extract to common
  create();
  getAll();
  get(id: string);
  put(issue: Issue);
  delete(id: string);
}

export class IssueService implements Crud {

  private issues: Issue[] = [];

  constructor() {
    this.setupDummyData(); // TODO remove later
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

  private setupDummyData() {
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
