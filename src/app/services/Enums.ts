declare function require(path: string);

class Enum {

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

export class IssueType extends Enum {

  public static readonly story = new Enum('S', 'story', require('../../assets/pics/issue-types/story.png'));
  public static readonly bug = new Enum('B', 'bug', require('../../assets/pics/issue-types/bug.png'));
  public static readonly task = new Enum('T', 'task', require('../../assets/pics/issue-types/task.png'));

  public static readonly IssueTypes = [
    IssueType.story, IssueType.bug, IssueType.task
  ];

  static get(type: string): IssueType {
    return this.IssueTypes.find(t => type === t.id);
  }
}

export class IssuePriority extends Enum {

  public static readonly critical = new Enum('1', 'critical', require('../../assets/pics/issue-priorities/critical.png'));
  public static readonly major = new Enum('2', 'major', require('../../assets/pics/issue-priorities/major.png'));
  public static readonly medium = new Enum('3', 'medium', require('../../assets/pics/issue-priorities/medium.png'));
  public static readonly minor = new Enum('4', 'minor', require('../../assets/pics/issue-priorities/minor.png'));
  public static readonly trivial = new Enum('5', 'trivial', require('../../assets/pics/issue-priorities/trivial.png'));

  public static readonly IssuePriorities = [
    IssuePriority.critical, IssuePriority.major, IssuePriority.medium, IssuePriority.minor, IssuePriority.trivial
  ];

  static get(priority: string): IssuePriority {
    return this.IssuePriorities.find(p => priority === p.id);
  }
}

export class IssueState extends Enum {

  public static readonly open = new Enum('O', 'open');
  public static readonly inWork = new Enum('W', 'inwork');
  public static readonly inTest = new Enum('T', 'intest');
  public static readonly done = new Enum('D', 'done');

  public static readonly IssueStates = [
    IssueState.open, IssueState.inWork, IssueState.inTest, IssueState.done
  ];

  static get(state: string): IssueState {
    return this.IssueStates.find(s => state === s.id);
  }
}

export class IssueResolution extends Enum {

  public static readonly done = new Enum('D', 'done');
  public static readonly wontDo = new Enum('WD', 'wontdo');
  public static readonly fixed = new Enum('F', 'fixed');
  public static readonly wontFix = new Enum('WF', 'wontfix');
  public static readonly unresolved = new Enum('U', 'unresolved');
  public static readonly incomplete = new Enum('I', 'incomplete');
  public static readonly duplicate = new Enum('DU', 'duplicate');

  public static readonly IssueResolutions = [
    IssueResolution.done, IssueResolution.wontDo, IssueResolution.fixed, IssueResolution.wontFix, IssueResolution.unresolved,
    IssueResolution.incomplete, IssueResolution.duplicate
  ];

  static get(resolution: string): IssueResolution {
    return this.IssueResolutions.find(r => resolution === r.id);
  }
}
