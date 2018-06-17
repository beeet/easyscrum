import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Issue { // TODO extract to own class incl enums
  private _id: number;
  private _title: string;
  private _description: string;
  private _type: IssueType;
  private _priority: IssuePriority;

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
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
  getAll();
  get(id: number);
  put(issue: Issue);
  delete(id: number);
}

export class IssueService implements Crud {

  private issues: Issue[] = [];

  constructor() {
    this.setupDummyData(); // TODO remove later
  }

  getAll(): Issue[] {
    return this.issues;
  }

  get(id: number): Issue {
    return this.issues.find(i => i.id === id);
  }

  put(issue: Issue): number {
    return this.issues.push(issue);
  }

  delete(id: number): void {
    const index = this.issues.findIndex(i => i.id === id);
    this.issues.splice(index, 1);
  }

  private setupDummyData() {
    const i1 = new Issue();
    i1.id = 1;
    i1.title = 'No beer avaliable';
    i1.description = 'Make sure there\'s enough beer every Saturday night';
    i1.priority = IssuePriority.blocker;
    i1.type = IssueType.task;
    this.issues.push(i1);
    const i2 = new Issue();
    i2.id = 2;
    i2.title = 'Missing Chips';
    i2.description = 'Enough chips is quite important';
    i2.priority = IssuePriority.high;
    i2.type = IssueType.task;
    this.issues.push(i2);
  }
}
