import _ from 'lodash';
import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {filteredByAssignee, filteredByState, IssueService} from '../../services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DragulaService} from 'ng2-dragula';
import {Issue} from '../../services/issue';
import {SprintService} from '../../services/sprint.service';
import {AssigneeService} from '../../services/assignee.service';
import {IssueState} from '../../services/Enums';
import {ModalDialogService, SimpleModalComponent} from 'ngx-modal-dialog';
import {NewSprintComponent} from '../../directives/new-sprint/new-sprint.component';
import {SetResolutionComponent} from '../../directives/set-resolution/set-resolution.component';

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.scss']
})

export class SprintBacklogComponent implements OnInit {
  issueService: IssueService;
  sprintService: SprintService;
  assigneeService: AssigneeService;
  private translate;
  private route: ActivatedRoute;
  private router: Router;
  states: IssueState[] = [];
  isSubtaskFilterAcitve = false;
  selectedAssigneeFilter: string;
  selectedIssue: Issue;
  contextmenu;

  constructor(translate: TranslateService,
              route: ActivatedRoute,
              router: Router,
              issueService: IssueService,
              sprintService: SprintService,
              assigneeService: AssigneeService,
              private dragula: DragulaService,
              private modalService: ModalDialogService,
              private viewRef: ViewContainerRef) {
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
      }
    });
    this.contextmenu = {visible: false, posX: 0, posY: 0, actions: [{action: 'highlighting', icon: 'new_releases'}]};
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
      .reduce(function (a, b) {
        if (b !== null && b !== a[0]) {
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

  navigateToIssueBoard() {
    this.router.navigate(['/issue-board/new'])
      .catch(reason =>
        console.log('error while navigate to sprint-backlog' + JSON.stringify(reason))
      );
  }

  highlighting(issue) {
    alert('TODO: ' + this.selectedIssue.title + ' highlighting!');
  }

  onrightClick(event, issue) {
    this.contextmenu.posX = event.clientX + 10;
    this.contextmenu.posY = event.clientY + 20;
    this.contextmenu.visible = true;
    this.selectedIssue = issue;
  }

  disableContextMenu() {
    this.contextmenu.visible = false;
  }

  onAction(e) {
    this.disableContextMenu();
    if (e.action === 'highlighting') {
      this.highlighting(e);
    }
  }

  createNewSprint() {
    this.modalService.openDialog(this.viewRef, {
      childComponent: NewSprintComponent,
    });
  }

  setResolution(issue: Issue) {
    this.modalService.openDialog(this.viewRef, {
      childComponent: SetResolutionComponent,
      // onClose: this.f/*.bind(this)*/,
      data: {issue}
    });
  }
}
