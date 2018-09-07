import _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {filteredByAssignee, filteredByState, IssueService} from '../../services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DragulaService} from 'ng2-dragula';
import {Issue} from '../../services/issue';
import {SprintService} from '../../services/sprint.service';
import {AssigneeService} from '../../services/assignee.service';
import {IssueState} from '../../services/Enums';

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
  issueService: IssueService;
  sprintService: SprintService;
  assigneeService: AssigneeService;
  private translate;
  private route: ActivatedRoute;
  private router: Router;
  states: IssueState[] = [];
  isSubtaskFilterAcitve = false;

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
    this.states.push(IssueState.open);
    this.states.push(IssueState.inWork);
    this.states.push(IssueState.inTest);
    this.states.push(IssueState.done);
    this.dragula.drop.subscribe(value => {
      const id = value[1].id;
      const from = value[3].id.split('-')[1];
      const to = value[2].id.split('-')[1];
      const state = _.find(this.states, {'label': to});
      this.issueService.get(id).state = state.state;
      });
  }

  public getIssues(issueState: IssueState): Issue[] {
    const sprintId = this.sprintService.getCurrent().id;
    return this.issueService.getAllFilteredBySprint(sprintId).filter(filteredByState(issueState));
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
        } else {
            this.selectedAssigneeFilter = filterAssignee;
        }
    }
}
