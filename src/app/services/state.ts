import {IssueState} from './issueState';

export class State {
  constructor(private _label: string, private _state: IssueState) {}

  get label(): string {
    return this._label;
  }
  get state(): IssueState {
    return this._state;
  }
}
