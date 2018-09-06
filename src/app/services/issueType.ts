declare function require(path: string);

export enum IssueType {
  story = 'S',
  bug = 'B',
  task = 'T'
}

export class Enum {

  constructor(private _id: string, private  _value: string, private _imageSrc?: string) {
  }

  get id() {
    return this._id;
  }

  get value() {
    return this._value;
  }

  get imageSrc() {
    return this._imageSrc;
  }
}

export const IssueTypes = [
  new Enum('S', 'story', require('../../assets/pics/story.png')),
  new Enum('B', 'bug', require('../../assets/pics/bug.png')),
  new Enum('T', 'task', require('../../assets/pics/task.png'))
];

export const IssuePriorities = [
  new Enum('1', 'critical', require('../../assets/pics/critical.png')),
  new Enum('2', 'major', require('../../assets/pics/major.png')),
  new Enum('3', 'medium', require('../../assets/pics/medium.png')),
  new Enum('4', 'minor', require('../../assets/pics/minor.png')),
  new Enum('5', 'trivial', require('../../assets/pics/trivial.png'))
];

export const IssueStates = [
  new Enum('O', 'open'),
  new Enum('W', 'inwork'),
  new Enum('T', 'intest'),
  new Enum('D', 'done'),
];

export const IssueResolutions = [
  new Enum('D', 'done'),
  new Enum('WD', 'wontdo'),
  new Enum('F', 'fixed'),
  new Enum('WF', 'wontfix'),
  new Enum('U', 'unresolved'),
  new Enum('I', 'incomplete'),
  new Enum('DU', 'duplicate')
];
