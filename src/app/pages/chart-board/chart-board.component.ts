import {Component, OnInit} from '@angular/core';
import {ChartType} from './chartType';

@Component({
  selector: 'app-chart-board',
  templateUrl: './chart-board.component.html',
  styleUrls: ['./chart-board.component.scss']
})
export class ChartBoardComponent implements OnInit {
  chartTypes: ChartType;
  chartType: string;

  constructor() {

  }

  ngOnInit() {
    this.chartType = ChartType.burndownchart;
  }

  resolveTooltipp(): string {
    switch (this.chartType) {
      case ChartType.burndownchart:
        return 'chart-board.burndownchart.toottip';
      case ChartType.sprintissueratio:
        return 'chart-board.sprintIssueRatio.toottip';
      default:
        return '';
    }
  }
}
