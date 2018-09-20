import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {IssueBoardComponent} from './issue-board.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SprintLabelPipe} from '../../pipes/sprint-label.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('IssueBoardComponent', () => {
  let component: IssueBoardComponent;
  let fixture: ComponentFixture<IssueBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueBoardComponent, SprintLabelPipe ],
      imports: [TranslateModule.forRoot(), FormsModule, ReactiveFormsModule,
          RouterTestingModule, NgbModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
