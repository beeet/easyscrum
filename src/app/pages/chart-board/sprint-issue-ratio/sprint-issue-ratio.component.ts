import {Component, OnInit} from '@angular/core';
import {SprintService} from '../../../services/sprint.service';
import {Issue} from '../../../services/issue';
import {Sprint} from '../../../services/sprint';
import {filteredBySprintId, IssueService} from '../../../services/issue.service';
import {IssueType} from '../../../services/Enums';

@Component({
  selector: 'app-sprint-issue-ratio',
  templateUrl: './sprint-issue-ratio.component.html',
  styleUrls: ['./sprint-issue-ratio.component.scss']
})
export class SprintIssueRatioComponent implements OnInit {

  // lineChart config
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = ['Stories', 'Tasks', 'Bugs'];
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(115,159,255,0.2)',
      borderColor: 'rgba(115,159,255,1)',
      pointBackgroundColor: 'rgba(115,159,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(115,159,255,0.8)'
    },
    {
      backgroundColor: 'rgba(65,232,135,0.2)',
      borderColor: 'rgba(65,232,135,1)',
      pointBackgroundColor: 'rgba(65,232,135,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(65,232,135,1)'
    },
    {
      backgroundColor: 'rgba(232,141,121,0.2)',
      borderColor: 'rgba(232,141,121,1)',
      pointBackgroundColor: 'rgba(232,141,121,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(232,141,121,0.8)'
    }

  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLegend = true;
  public lineChartType = 'pie';


  private issueService: IssueService;
  private issues: Array<Issue>;
  public sprintService: SprintService;
  public sprintSelected: Sprint;
  public sprintSelectedId: string;

  constructor(issueService: IssueService, sprintService: SprintService) {
    this.issueService = issueService;
    this.sprintService = sprintService;
  }

  ngOnInit() {

  }

  public renderChart(): void {
    this.lineChartData = []; // init
    this.sprintSelected = this.sprintService.get(this.sprintSelectedId);
    this.issues = this.issueService.getAllFiltered(filteredBySprintId(this.sprintSelectedId));
    let storyCounter = 0;
    let taskCounter = 0;
    let bugCounter = 0;
    this.issues.forEach(issue => {
      if (issue.type === IssueType.story) {
        storyCounter++;
      } else if (issue.type === IssueType.task) {
        taskCounter++;
      } else if (issue.type === IssueType.bug) {
        bugCounter++;
      }
    });
    this.lineChartData.push({data: [storyCounter, taskCounter, bugCounter], label: 'Issues'});
  }

  // events
  public chartClicked(event: any): void {
    console.log(event);
  }

  public chartHovered(event: any): void {
    console.log(event);
  }

}
