import {Injectable} from '@angular/core';
import {IssuePriority} from './IssuePriority';
import {IssueType} from './issueType';

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
