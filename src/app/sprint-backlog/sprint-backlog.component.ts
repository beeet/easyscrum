import { Component, OnInit } from '@angular/core';
import {IssueService} from '../services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.css']
})

export class SprintBacklogComponent implements OnInit {
  issueService: IssueService;
  private translate;
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
  }

}
