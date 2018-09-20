import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintIssueRatioComponent } from './sprint-issue-ratio.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {SprintLabelPipe} from '../../../pipes/sprint-label.pipe';
import {ChartsModule} from 'ng2-charts';

describe('SprintIssueRatioComponent', () => {
  let component: SprintIssueRatioComponent;
  let fixture: ComponentFixture<SprintIssueRatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintIssueRatioComponent, SprintLabelPipe ],
      imports: [TranslateModule.forRoot(), FormsModule, ChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintIssueRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
