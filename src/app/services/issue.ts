import _ from 'lodash';
import {Injectable} from '@angular/core';
import {DateUtil} from '../utils/date.util';
import {IssuePriority, IssueResolution, IssueState, IssueType} from './Enums';
import {IssueLink} from './IssueLink';

@Injectable({
    providedIn: 'root'
})

export class Issue {
    id: string;
    private _title: string;
    private _description: string;
    private _type: IssueType;
    private _priority: IssuePriority;
    private _state: IssueState;
    private _sprintId: string;
    private _assigneeId: string;
    private _dueDate: Date;
    private _estimated: number;
    private _elapsed: number;
    private _creationDate: Date;
    private _resolution: IssueResolution;
    private _resolutionDate: Date;
    private _highlighting: boolean;
    private _comments: Array<Object> = [];
    private _issueLinks: Array<IssueLink> = [];
    private _subissues: Array<Issue> = [];
    private _backlogPriority: number;

    private dateUtil = new DateUtil();

  static get(issue: Issue) {
    issue.dateUtil = new DateUtil();
    // beim Speichern der Klassen in der IndexedDB gehen die Klasseninformationen verloren
      issue.type = IssueType.get((<any>issue.type)._id);
      issue.state = IssueState.get((<any>issue.state)._id);
      issue.priority = issue.priority ? IssuePriority.get((<any>issue.priority)._id) : undefined;
      issue.resolution = issue.resolution ? IssueResolution.get((<any>issue.resolution)._id) : undefined;
      const issueLinks = issue._issueLinks;
      issue.issueLinks = issueLinks.map((link: any) => new IssueLink(link._relatedIssueId, link._linkType));
    return issue;
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

    get dueDate(): Date {
        return this._dueDate;
    }

    set dueDate(value: Date) {
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

    get creationDate(): Date {
        return this._creationDate;
    }

    set creationDate(value: Date) {
        this._creationDate = value;
    }

    get resolution(): IssueResolution {
        return this._resolution;
    }

    set resolution(value: IssueResolution) {
        if (!value) {
          this.resolutionDate = undefined;
        } else if (value !== this.resolution) {
            this.resolutionDate = this.dateUtil.now();
        }
        this._resolution = value;
    }

    get resolutionDate(): Date {
        return this._resolutionDate;
    }

    set resolutionDate(value: Date) {
        this._resolutionDate = value;
    }

    get highlighting(): boolean {
        return this._highlighting;
    }

    set highlighting(value: boolean) {
        this._highlighting = value;
    }

    get comments(): Array<Object> {
        return this._comments;
    }

    set comments(value: Array<Object>) {
        this._comments = value;
    }

    addComment(comment: string) {
        this._comments.push({comment: comment});
    }

    get issueLinks(): Array<IssueLink> {
        return this._issueLinks;
    }

    set issueLinks(value: Array<IssueLink>) {
        this._issueLinks = value;
    }

    addIssueLink(value: IssueLink) {
        this.issueLinks.push(value);
    }

    removeIssueLink(id: string) {
      _.remove(this.issueLinks, l => l.id === id);
    }

    get subissue(): Array<Issue> {
        return this._subissues;
    }

    set subissues(issues: Array<Issue>) {
        if (issues) {
            issues.forEach(issue => this.assertIssueTypeOfTask(issue));
            this._subissues = issues;
        }
    }

    get backlogPriority(): number {
        return this._backlogPriority;
    }

    set backlogPriority(value: number) {
      this._backlogPriority = value;
    }

  addSubissue(issue: Issue) {
        if (issue) {
            this.assertIssueTypeOfTask(issue);
            this._subissues.push(issue);
        }
    }

    private assertIssueTypeOfTask(issue: Issue) {
        if (issue.type !== IssueType.task) {
            throw new Error('only issues of type task allowed');
        }
    }
}
