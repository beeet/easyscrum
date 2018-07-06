import { Component, OnInit } from '@angular/core';
import {SprintService} from '../../services/sprint.service';
import {filteredBySprintId, IssueService} from '../../services/issue.service';
import {Issue} from '../../services/issue';
import {Sprint} from '../../services/sprint';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css']
})
export class BurndownChartComponent implements OnInit {

  // lineChart config
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(115,159,255,0.2)',
      borderColor: 'rgba(115,159,255,1)',
      pointBackgroundColor: 'rgba(115,159,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(115,159,255,0.8)'
    }
  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLegend = false;
  public lineChartType = 'line';


  private issueService: IssueService;
  private issues: Array<Issue>;
  public sprintService: SprintService;
  public sprintSelected: Sprint;

  constructor(issueService: IssueService, sprintService: SprintService) {
    this.issueService = issueService;
    this.sprintService = sprintService;
  }

  ngOnInit() {

  }

  public renderChart(): void {
    this.sprintSelected = this.sprintService.getLatest();
    if (!this.issues) {
      this.issues = this.issueService.getAllFiltered(filteredBySprintId(this.sprintSelected.id))
        .sort((a, b) => a.creationDate.valueOf() - b.creationDate.valueOf());
    }
    let tempDate = this.sprintSelected.begin.clone();
    const lineChartDataData = [];
    while (!tempDate.isAfter(this.sprintSelected.end)) {
      this.lineChartLabels.push(tempDate.format('DD-MM'));
      console.log(tempDate);
      tempDate = tempDate.add(1, 'days');
      let counter = 0;
      this.issues.forEach(issue => {
        if (!issue.resolutionDate || !issue.resolutionDate.isAfter(tempDate)) {
          counter++;
        }
      });
      lineChartDataData.push(counter);
    }
    this.lineChartData.push({data: lineChartDataData, label: 'Issues'});
  }

  // events
  public chartClicked(event: any): void {
    console.log(event);
  }

  public chartHovered(event: any): void {
    console.log(event);
  }

}
