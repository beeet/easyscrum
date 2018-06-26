export class Assignee {
  private _id: string;
  private _nickname: string;

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get nickname(): string {
    return this._nickname;
  }
  set nickname(value: string) {
    this._nickname = value;
  }
}
