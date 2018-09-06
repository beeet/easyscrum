import _ from 'lodash';
import {IssueState} from '../../services/issueState';
import {Component, OnInit} from '@angular/core';
import {filteredByAssignee, filteredByState, IssueService} from '../../services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DragulaService} from 'ng2-dragula';
import {Issue} from '../../services/issue';
import {State} from '../../services/state';
import {SprintService} from '../../services/sprint.service';
import {AssigneeService} from '../../services/assignee.service';
import {IssueType} from '../../services/issueType';
import {IssuePriority} from '../../services/issuePriority';
import {issueData} from '../../services/DUMMY_DATA';

declare function require(path: string);

@Component({
    selector: 'app-sprint-backlog',
    templateUrl: './sprint-backlog.component.html',
    styleUrls: ['./sprint-backlog.component.scss']
})

export class SprintBacklogComponent implements OnInit {
    issueService: IssueService;
    sprintService: SprintService;
    assigneeService: AssigneeService;
    issueStates = IssueState;
    private translate;
    private route: ActivatedRoute;
    private router: Router;
    states: State[] = [];
    isSubtaskFilterAcitve = false;
    selectedAssigneeFilter: string;
    doHighlight: boolean;

    constructor(translate: TranslateService,
                route: ActivatedRoute,
                router: Router,
                issueService: IssueService,
                sprintService: SprintService,
                assigneeService: AssigneeService,
                private dragula: DragulaService) {
        this.translate = translate;
        this.route = route;
        this.router = router;
        this.issueService = issueService;
        this.sprintService = sprintService;
        this.assigneeService = assigneeService;
    }

    ngOnInit() {
        this.states.push(new State('open', IssueState.open));
        this.states.push(new State('inwork', IssueState.inwork));
        this.states.push(new State('intest', IssueState.intest));
        this.states.push(new State('done', IssueState.done));
        this.dragula.drop.subscribe(value => {
            const id = value[1].id;
            const from = value[3].id.split('-')[1];
            const to = value[2].id.split('-')[1];
            const state = _.find(this.states, {'label': to});
            this.issueService.get(id).state = state.state;
        });
    }

    getIssues(issueState: IssueState): Issue[] {
        const sprintId = this.sprintService.getCurrent().id;

        const sprintIssues = this.issueService.getAllFilteredBySprint(sprintId);
        const issuesByState = sprintIssues.filter(filteredByState(issueState));
        if (this.selectedAssigneeFilter && this.selectedAssigneeFilter !== '') {
            return issuesByState.filter(filteredByAssignee(this.selectedAssigneeFilter));
        } else {
            return issuesByState;
        }
    }

    getInvolvedAssignees(): string[] {
        const sprintId = this.sprintService.getCurrent().id;
        const sprintIssues = this.issueService.getAllFilteredBySprint(sprintId);
        const assignees = sprintIssues
            .map(value => value.assigneeId)
            .sort()
            .reduce(function(a, b) {
                if (b !== a[0]) {
                    a.unshift(b);
                }
                return a;
                }, []);
        return assignees;
    }

    getAvatar(assigneeId: string): string {
        return this.assigneeService.getAvatar(assigneeId);
    }

    getTaskType(type: IssueType): string {
        if (IssueType.bug === type) {
            return 'http://localhost:4200/assets/pics/issue-types/bug.png';
        } else if (IssueType.story === type) {
            return 'http://localhost:4200/assets/pics/issue-types/story.png';
        } else if (IssueType.task === type) {
            return 'http://localhost:4200/assets/pics/issue-types/task.png';
        }
    }

    getTaskPriority(priority: IssuePriority): string {
        if (IssuePriority.blocker === priority) {
            return 'http://localhost:4200/assets/pics/issue-priorities/critical.png';
        } else if (IssuePriority.high === priority) {
            return 'http://localhost:4200/assets/pics/issue-priorities/major.png';
        } else if (IssuePriority.medium === priority) {
            return 'http://localhost:4200/assets/pics/issue-priorities/medium.png';
        } else if (IssuePriority.low === priority) {
            return 'http://localhost:4200/assets/pics/issue-priorities/minor.png';
        } else {
            return 'http://localhost:4200/assets/pics/issue-priorities/trivial0.png';
        }
    }

    hasSubtask(issue: Issue): boolean {
        const subissues = issue.subissue;
        return subissues && subissues.length > 0;
    }

    setSubtaskFilterAcitve(event: any): void {
        console.log('setSubtaskFilterAcitve clicked');
        this.isSubtaskFilterAcitve = true;
        // TODO sbs filter handling subtasks anzeigen (ein/aus)
    }

    setAssigneeFilter(filterAssignee: string) {
        if (filterAssignee === this.selectedAssigneeFilter) {
            this.selectedAssigneeFilter = ''; // reset filter
            this.doHighlight = false;
        } else {
            this.selectedAssigneeFilter = filterAssignee;
            this.doHighlight = true;
        }
    }
}
