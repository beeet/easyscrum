import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IssueService} from '../services/issue.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-issue-board',
  templateUrl: './issue-board.component.html',
  styleUrls: ['./issue-board.component.css']
})
export class IssueBoardComponent implements OnInit {
  private translate;
  issueService;
  currentIssue;
  private route: ActivatedRoute;
  private router: Router;

  constructor(translate: TranslateService, route: ActivatedRoute, router: Router,
              issueService: IssueService) {
    this.translate = translate;
    this.route = route;
    this.router = router;
    this.issueService = issueService;
  }


  ngOnInit() {
    this.currentIssue = this.issueService.get(1); // TODO via url stateParam currentIssue via laden
  }

  onSave() {
    this.router.navigate(['/sprint-backlog']);
  }

  onCancel() {

  }
}
