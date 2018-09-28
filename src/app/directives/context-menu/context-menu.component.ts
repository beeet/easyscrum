import {Component, Input, OnInit} from '@angular/core';
import {NewSprintComponent} from '../new-sprint/new-sprint.component';
import {SetSprintComponent} from '../set-sprint/set-sprint.component';
import {SprintService} from '../../services/sprint.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IssueService} from '../../services/issue.service';
import {Router} from '@angular/router';
import {Issue} from '../../services/issue';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @Input() contextmenu;
  actions = [];

  constructor(private issueService: IssueService,
              private sprintService: SprintService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    const target: Issue = this.contextmenu.target;
    const source: string = this.contextmenu.source;
    this.actions.push(
      {action: 'add', icon: 'add_circle'},
      {action: 'new', icon: 'library_add'});
    if (target && source === 'pb') {
      this.actions.push(
        {action: 'edit', icon: 'edit'},
        {action: 'change', icon: 'rotate_left'}
      );
      if (this.issueService.isDeletionIssueAllowed(target)) {
        this.actions.push({action: 'delete', icon: 'close'});
      }
    }
    if (target && source === 'sp') {
      this.actions.push(
        {action: 'edit', icon: 'edit'},
        {action: 'highlighting', icon: 'new_releases'});
    }
  }

  editItem(issue) {
    this.router.navigate(['/issue-board/' + issue.id]);
  }

  deleteItem(issue) {
    this.issueService.delete(issue.id);
  }

  setItemSprint(issue) {
    const modalRef = this.modalService.open(SetSprintComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.issue = issue;
  }

  createNewSprint(issue) {
    const modalRef = this.modalService.open(NewSprintComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.issue = issue;
  }

  highlightIssue(issue) {
    this.issueService.highlightIssue(issue);
  }

  navigateToIssueBoard() {
    this.router.navigate(['/issue-board/new'])
      .catch(reason =>
        console.log('error while navigate to sprint-backlog' + JSON.stringify(reason))
      );
  }

  onAction(a) {
    if (a.action === 'edit') {
      this.editItem(this.contextmenu.target);
    } else if (a.action === 'change') {
      this.setItemSprint(this.contextmenu.target);
    } else if (a.action === 'delete') {
      this.deleteItem(this.contextmenu.target);
    } else if (a.action === 'add') {
      this.createNewSprint(this.contextmenu.target);
    } else if (a.action === 'new') {
      this.navigateToIssueBoard();
    } else if (a.action === 'highlighting') {
      this.highlightIssue(this.contextmenu.target);
    }
  }
}
