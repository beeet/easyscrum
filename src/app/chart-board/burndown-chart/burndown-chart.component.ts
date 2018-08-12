import { Component, OnInit } from '@angular/core';
import {SprintService} from '../../services/sprint.service';
import {filteredBySprintId, IssueService} from '../../services/issue.service';
import {Issue} from '../../services/issue';
import {Sprint} from '../../services/sprint';
import * as moment from 'moment';


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
  private issues: Issue[];
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
    this.lineChartLabels = []; // init
    this.lineChartData = []; // init
    this.sprintSelected = this.sprintService.get(this.sprintSelectedId);
    this.issues = this.issueService.getAllFiltered(filteredBySprintId(this.sprintSelected.id));
    this.debug();
    this.determindeChartLabels();
    this.determindeChartData();
  }

  private determindeChartLabels() {
    let tempDate = this.sprintSelected.begin.clone();
    while (!tempDate.isAfter(this.sprintSelected.end)) {
      const label = tempDate.format('DD-MM');
      this.lineChartLabels.push(label);
      tempDate = tempDate.add(1, 'days');
    }
  }

  private determindeChartData() {
    const myMap = new Map();
    this.issues.forEach(value => {
      const resolutionDate = value.resolutionDate;
      const label = moment(resolutionDate).format('DD-MM');

      if (!myMap.get(label)) {
        myMap.set(label, value.estimated);
      } else {
        myMap.set(label, myMap.get(label) + value.estimated);
      }
    });

    const lineChartDataData = [];
    let totalOfEstimationsOverAllIssues = this.calculateTotalOfEstimationsOverAllIssues();
    this.lineChartLabels.forEach(label => {
      const hours = myMap.get(label);
      if (hours) {
        totalOfEstimationsOverAllIssues = totalOfEstimationsOverAllIssues - hours;
      }
      lineChartDataData.push(totalOfEstimationsOverAllIssues);
    });

    this.lineChartData.push({data: lineChartDataData, label: 'Issues'});
  }

  calculateTotalOfEstimationsOverAllIssues() {
    let total = 0;
    this.issues.forEach(issue => {
      total += issue.estimated;
    });
    return total;
  }

  // events
  public chartClicked(event: any): void {
    // console.log(event);
  }

  public chartHovered(event: any): void {
    // console.log(event);
  }

  private debug() {
    this.issues.forEach(value => {
      console.log('crea: ' + value.creationDate.format('DD.MM.YYYY') + ', done: ' + (value.resolutionDate ? value.resolutionDate.format('DD.MM.YYYY') : 'n/a' )  + ', h: ' + value.estimated);
    });
  }

}
