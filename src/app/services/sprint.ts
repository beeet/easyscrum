import {Moment} from 'moment';

export class Sprint {
  private _id: string;
  private _name: string;
  private _begin: Moment;
  private _end: Moment;

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get begin(): Moment {
    return this._begin;
  }
  set begin(value: Moment) {
    this._begin = value;
  }
  get end(): Moment {
    return this._end;
  }
  set end(value: Moment) {
    this._end = value;
  }
}
