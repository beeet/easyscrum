import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartBoardComponent} from './chart-board.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {BurndownChartComponent} from './burndown-chart/burndown-chart.component';
import {SprintIssueRatioComponent} from './sprint-issue-ratio/sprint-issue-ratio.component';
import {SprintLabelPipe} from '../../pipes/sprint-label.pipe';
import {ChartsModule} from 'ng2-charts';

describe('ChartBoardComponent', () => {
  let component: ChartBoardComponent;
  let fixture: ComponentFixture<ChartBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBoardComponent, BurndownChartComponent, SprintIssueRatioComponent, SprintLabelPipe],
      imports: [TranslateModule.forRoot(), FormsModule, NgbTooltipModule.forRoot(), ChartsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
