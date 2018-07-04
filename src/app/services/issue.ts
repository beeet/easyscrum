import {Injectable} from '@angular/core';
import {IssuePriority} from './issuePriority';
import {IssueType} from './issueType';
import {IssueState} from './issueState';
import {IssueResolution} from './issueResolution';
import {Moment} from 'moment';
import {DateUtil} from '../utils/date.util';

@Injectable({
  providedIn: 'root'
})

export class Issue {
  private _id: string;
  private _title: string;
  private _description: string;
  private _type: IssueType;
  private _priority: IssuePriority;
  private _state: IssueState;
  private _sprintId: string;
  private _assigneeId: string;
  private _dueDate: Moment;
  private _estimated: number;
  private _elapsed: number;
  private _resolution: IssueResolution;
  private _resolutionDate: Moment;

  private dateUtil = new DateUtil();

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
  get state(): IssueState {
    return this._state;
  }
  set state(value: IssueState) {
    this._state = value;
  }
  get sprintId(): string {
    return this._sprintId;
  }
  set sprintId(value: string) {
    this._sprintId = value;
  }
  get assigneeId(): string {
    return this._assigneeId;
  }
  set assigneeId(value: string) {
    this._assigneeId = value;
  }
  get dueDate(): Moment {
    return this._dueDate;
  }
  set dueDate(value: Moment) {
    this._dueDate = value;
  }
  get estimated(): number {
    return this._estimated;
  }
  set estimated(value: number) {
    this._estimated = value;
  }
  get elapsed(): number {
    return this._elapsed;
  }
  set elapsed(value: number) {
    this._elapsed = value;
  }
  get resolution(): IssueResolution {
    return this._resolution;
  }
  set resolution(value: IssueResolution) {
    if (value !== this.resolution) {
      this.resolutionDate = this.dateUtil.now();
    }
    this._resolution = value;
  }
  get resolutionDate(): Moment {
    return this._resolutionDate;
  }
  set resolutionDate(value: Moment) {
    this._resolutionDate = value;
  }
}
