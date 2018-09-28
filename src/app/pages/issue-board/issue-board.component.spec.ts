import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IssueBoardComponent} from './issue-board.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SprintLabelPipe} from '../../pipes/sprint-label.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {LetDirective} from '../../directives/ngLet/LetDirective';

xdescribe('IssueBoardComponent', () => {
  let component: IssueBoardComponent;
  let fixture: ComponentFixture<IssueBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueBoardComponent, SprintLabelPipe, LetDirective],
      imports: [CommonModule, TranslateModule.forRoot(),
        FormsModule, ReactiveFormsModule,
        RouterTestingModule, NgbModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
