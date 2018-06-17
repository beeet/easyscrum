import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IssueService} from '../services/issue.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    const urlParam = this.route.snapshot.paramMap.get('id');
    if (urlParam) {
      this.currentIssue = this.issueService.get(urlParam);
    } else {
      this.currentIssue = this.issueService.create();
    }
  }

  onSave() {
    this.router.navigate(['/sprint-backlog']);
  }

  onCancel() {

  }
}
