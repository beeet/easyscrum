import {Component, OnInit} from '@angular/core';
import {SprintService} from '../../../services/sprint.service';
import {filteredBySprintId, IssueService} from '../../../services/issue.service';
import {Issue} from '../../../services/issue';
import {Sprint} from '../../../services/sprint';
import {format, addDays, isAfter} from 'date-fns';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.scss']
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

  private issues: Issue[];
  public sprintSelected: Sprint;
  public sprintSelectedId: string;

  constructor(private issueService: IssueService,
              public sprintService: SprintService) {
  }

  ngOnInit() {

  }

  public renderChart(): void {
    this.sprintSelected = this.sprintService.get(this.sprintSelectedId);
    this.issues = this.issueService.getAllFiltered(filteredBySprintId(this.sprintSelected.id));
    this.init();
    this.determindeChartLabels();
    this.determindeChartData();
  }

  private init() {
    while (this.lineChartLabels.length > 0) {
      this.lineChartLabels.pop();
    }
    this.lineChartData = [];
  }

  private determindeChartLabels() {
    let tempDate = new Date(this.sprintSelected.begin);
    while (!isAfter(tempDate, this.sprintSelected.end)) {
      const label = format(tempDate, 'DD-MM');
      this.lineChartLabels.push(label);
      tempDate = addDays(tempDate, 1);
    }
  }

  private determindeChartData() {
    const myMap = new Map();
    this.issues.forEach(value => {
      const resolutionDate = value.resolutionDate;
      const label = format(resolutionDate, 'DD-MM');

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

  private calculateTotalOfEstimationsOverAllIssues() {
    return this.issues.map(issue => issue.estimated)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }

}
