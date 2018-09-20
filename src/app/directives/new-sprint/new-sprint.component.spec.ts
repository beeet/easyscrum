import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NewSprintComponent} from './new-sprint.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {SprintLabelPipe} from '../../pipes/sprint-label.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('NewSprintComponent', () => {
  let component: NewSprintComponent;
  let fixture: ComponentFixture<NewSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewSprintComponent, SprintLabelPipe],
      imports: [TranslateModule.forRoot(), FormsModule, NgbModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
