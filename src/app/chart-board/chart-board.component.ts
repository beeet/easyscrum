import { Component, OnInit } from '@angular/core';
import {ChartType} from './chartType';

@Component({
  selector: 'app-chart-board',
  templateUrl: './chart-board.component.html',
  styleUrls: ['./chart-board.component.css']
})
export class ChartBoardComponent implements OnInit {
  chartTypes: ChartType;
  chartType: string;

  constructor() {

  }

  ngOnInit() {
    this.chartType = ChartType.burndownchart;
  }


}
