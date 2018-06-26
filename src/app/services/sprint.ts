export class Sprint {
  private _id: string;
  private _name: string;
  private _begin: Date;
  private _end: Date;

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
  get begin(): Date {
    return this._begin;
  }
  set begin(value: Date) {
    this._begin = value;
  }
  get end(): Date {
    return this._end;
  }
  set end(value: Date) {
    this._end = value;
  }
}
