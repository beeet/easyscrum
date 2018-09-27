import _ from 'lodash';
import {Component, EventEmitter, OnInit, Output, ViewContainerRef} from '@angular/core';
import {filteredByAssignee, filteredByState, IssueService} from '../../services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DragulaService} from 'ng2-dragula';
import {Issue} from '../../services/issue';
import {SprintService} from '../../services/sprint.service';
import {AssigneeService} from '../../services/assignee.service';
import {IssueState} from '../../services/Enums';
import {ModalDialogService} from 'ngx-modal-dialog';
import {NewSprintComponent} from '../../directives/new-sprint/new-sprint.component';
import {SetResolutionComponent} from '../../directives/set-resolution/set-resolution.component';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.scss']
})

export class SprintBacklogComponent implements OnInit {
  @Output() eventEmitterClick = new EventEmitter();
  states: IssueState[] = [];
  isSubtaskFilterAcitve = false;
  selectedAssigneeFilter: string;

  dndEnabled = AppComponent.DRAGABLE;

  static hasSubtask(issue: Issue): boolean {
    const subissues = issue.subissue;
    return subissues && subissues.length > 0;
  }

  constructor(public issueService: IssueService,
              public sprintService: SprintService,
              public assigneeService: AssigneeService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
              private dragula: DragulaService,
              private modalService: ModalDialogService,
              private viewRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.states.push(IssueState.open);
    this.states.push(IssueState.inWork);
    this.states.push(IssueState.inTest);
    this.states.push(IssueState.done);
    this.dragula.drop.subscribe(value => {
      const id = value[1].id;
      const to = value[2].id.split('-')[1];
      const state = _.find(this.states, {'value': to});
      const issue = this.issueService.get(id);
      if (state === issue.state) {
        return;
      }
      if (state === IssueState.done) {
        this.setResolution(issue);
      } else {
        if (issue.state === IssueState.done) {
          issue.resolution = undefined;
        }
        issue.state = state;
        this.issueService.put(issue);
      }
    });
  }

  getIssues(issueState: IssueState): Issue[] {
    const sprint = this.sprintService.getCurrent();
    if (!sprint) {
      console.log('Sprint-Backlog#getIssues(): kein aktueller Sprint vorhanden');
      return;
    }
    const sprintId = sprint.id;

    const sprintIssues = this.issueService.getAllFilteredBySprint(sprintId);
    const issuesByState = sprintIssues.filter(filteredByState(issueState));
    if (this.selectedAssigneeFilter && this.selectedAssigneeFilter !== '') {
      return issuesByState.filter(filteredByAssignee(this.selectedAssigneeFilter));
    } else {
      return issuesByState;
    }
  }

  getInvolvedAssignees(): string[] {
    const sprint = this.sprintService.getCurrent();
    if (!sprint) {
      console.log('Sprint-Backlog#getInvolvedAssignees(): kein aktueller Sprint vorhanden');
      return;
    }
    const sprintId = sprint.id;
    const sprintIssues = this.issueService.getAllFilteredBySprint(sprintId);
    return this.distinctAssignees(sprintIssues);
  }

  private distinctAssignees(sprintIssues) {
    return sprintIssues
      .map(value => value.assigneeId)
      .sort()
      .reduce(function (a, b) {
        if (b !== null && b !== a[0]) {
          a.unshift(b);
        }
        return a;
      }, []);
  }

  getAvatar(assigneeId: string): string {
    return this.assigneeService.getAvatar(assigneeId);
  }

  setAssigneeFilter(filterAssignee: string) {
    if (filterAssignee === this.selectedAssigneeFilter) {
      this.selectedAssigneeFilter = ''; // reset filter
    } else {
      this.selectedAssigneeFilter = filterAssignee;
    }
  }

  navigateToIssueBoard() {
    this.router.navigate(['/issue-board/new'])
      .catch(reason =>
        console.log('error while navigate to sprint-backlog' + JSON.stringify(reason))
      );
  }

  createNewSprint() {
    this.modalService.openDialog(this.viewRef, {
      childComponent: NewSprintComponent,
    });
  }

  setResolution(issue: Issue) {
    this.modalService.openDialog(this.viewRef, {
      childComponent: SetResolutionComponent,
      data: {issue}
    });
  }

  onrightClick(event, item) {
    event.item = item;
    event.source = 'sp';
    this.eventEmitterClick.emit(event);
  }
}
