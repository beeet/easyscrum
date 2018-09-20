import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurndownChartComponent } from './burndown-chart.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {SprintLabelPipe} from '../../../pipes/sprint-label.pipe';
import {ChartsModule} from 'ng2-charts';

describe('BurndownChartComponent', () => {
  let component: BurndownChartComponent;
  let fixture: ComponentFixture<BurndownChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurndownChartComponent, SprintLabelPipe],
      imports: [TranslateModule.forRoot(), FormsModule, ChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurndownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
