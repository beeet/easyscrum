import _ from 'lodash';
import {IssueState} from '../../services/issueState';
import { Component, OnInit } from '@angular/core';
import {IssueService, filteredByState, filterdByType, filteredBySprintId} from '../../services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DragulaService} from 'ng2-dragula';
import {Issue} from '../../services/issue';
import {State} from '../../services/state';

declare function require(path: string);

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.scss']
})

export class SprintBacklogComponent implements OnInit {
  imageSrc = require('../../../assets/pics/avatar.png');
  issueService: IssueService;
  issueStates = IssueState;
  private translate;
  private route: ActivatedRoute;
  private router: Router;
  states: State[] = [];

  constructor(translate: TranslateService, route: ActivatedRoute, router: Router,
              issueService: IssueService, private dragula: DragulaService) {
    this.translate = translate;
    this.route = route;
    this.router = router;
    this.issueService = issueService;
  }

  public getIssues(issueState: IssueState): Issue[] {
    return this.issueService.getAllFilteredByState(issueState);
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
      // this.issueService.get(id).state = _.find(this.states, {'label': to}).state;
      const state = _.find(this.states, {'label': to});
      this.issueService.get(id).state = state.state;
      });
  }
}
