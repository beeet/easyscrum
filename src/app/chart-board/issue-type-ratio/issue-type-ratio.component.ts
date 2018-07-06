import { Component, OnInit } from '@angular/core';
import {SprintService} from '../../services/sprint.service';
import {IssueService} from '../../services/issue.service';
import {Issue} from '../../services/issue';
import {DateUtil} from '../../utils/date.util';

@Component({
  selector: 'app-issue-type-ratio',
  templateUrl: './issue-type-ratio.component.html',
  styleUrls: ['./issue-type-ratio.component.css']
})
export class IssueTypeRatioComponent implements OnInit {
  // TODO sbs chart aller offnen issues gegliedert nach Story, bug, Task (über sprint hinweg)

  // lineChart
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Stories'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Tasks'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Bugs'}
  ];
  public lineChartLabels: Array<any> = ['09.07.', '10.07.', '11.07.', '12.07.', '13.07.', '14.07.', '15.07.'];
  public lineChartOptions: any = {
    responsive: true
  };
  // TODO sbs colors
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  private issueService: IssueService;
  private sprintService: SprintService;
  private issues: Array<Issue>;

  private dateUtil = new DateUtil();

  constructor(issueService: IssueService, sprintService: SprintService) {
    this.issueService = issueService;
    this.sprintService = sprintService;
  }

  ngOnInit() {
    const sprintId = this.sprintService.getLatest().id;
    if (!this.issues) {
      this.issues = this.issueService.getAllNotClosed()
        .sort((a, b) => a.creationDate.valueOf() - b.creationDate.valueOf());
    }

    // const dates = this.issues.map(issue => issue.creationDate.toDate());
    // const minDate = new Date(Math.min.apply(null, dates)); // when the first issue was opened
    // const maxDate = this.dateUtil.now();
    // this.issues.forEach(issue => {
    //   console.log(issue);
    //   this.lineChartLabels = []; // init
    //   this.lineChartLabels.push(issue.creationDate);
    //   // dann labels befüllen mit Tagen
    //   // und count aller offenen tasks zum jeweiligen tag
    //   // issue.
    //    const stories = [];
    //   const tasks = [];
    //   const bugs = [];
    //   if (issue.type === IssueType.story) {
    //     stories.push(issue);
    //   } else if (issue.type === IssueType.task) {
    //     tasks.push(issue);
    //   } else if (issue.type === IssueType.bug) {
    //     bugs.push(issue);
    //   }
    //   this.lineChartData = [
    //     {data: [65, 59, 80, 81, 56, 55, 40], label: 'Stories'},
    //     {data: [28, 48, 40, 19, 86, 27, 90], label: 'Tasks'},
    //     {data: [18, 48, 77, 9, 100, 27, 40], label: 'Bugs'}
    //   ];
    // });
    //
    // this.issues.filter( i => i.state !== IssueState.done);
  }

  // events
  public chartClicked(event: any): void {
    console.log(event);
  }

  public chartHovered(event: any): void {
    console.log(event);
  }

}
