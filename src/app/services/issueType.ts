declare function require(path: string);

export enum IssueType {
  story = 'S',
  bug = 'B',
  task = 'T'
}

export class IssueType2 {

  constructor(private _id: string, private  _value: string, private _imageSrc: string) {}

  get id() {return this._id;}
  get value() {return this._value;}
  get imageSrc() {return this._imageSrc;}
}

export const IssueTypes = [
  new IssueType2('S', 'Story', require('../../assets/pics/story.png')),
  new IssueType2('B', 'Bug', require('../../assets/pics/bug.png')),
  new IssueType2('T', 'Task', require('../../assets/pics/task.png'))
];
