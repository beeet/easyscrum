import {Injectable} from '@angular/core';
import {DateUtil} from '../utils/date.util';
import {IssuePriority, IssueResolution, IssueState, IssueType} from './Enums';

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
    private _dueDate: Date;
    private _estimated: number;
    private _elapsed: number;
    private _creationDate: Date;
    private _resolution: IssueResolution;
    private _resolutionDate: Date;
    private _highlighting: boolean;
    private _comments: Array<Object>;
    private _issueLinks: Array<Issue>;
    private _subissues: Array<Issue>;

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
        if (value !== this.resolution) {
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

    get issueLinks(): Array<Issue> {
        return this._issueLinks;
    }

    set issueLinks(value: Array<Issue>) {
        this._issueLinks = value;
    }

    addIssueLink(value: Issue) {
        this.issueLinks.push(value);
    }

    get subIssue(): Array<Issue> {
        return this._subissues;
    }

    set subIssues(issues: Array<Issue>) {
        issues.forEach(issue => {
            this.assertIssueTypeOfTask(issue);
        });
        this._subissues = issues;
    }

    addSubIssue(issue: Issue) {
        this.assertIssueTypeOfTask(issue);
        this.issueLinks.push(issue);
    }

    private assertIssueTypeOfTask(issue: Issue) {
        if (issue.type !== IssueType.task) {
            throw new Error('only issues of type task allowed');
        }
    }
}
