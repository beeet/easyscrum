import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NewSprintComponent} from './new-sprint.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SprintLabelPipe} from '../../pipes/sprint-label.pipe';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SprintService} from '../../services/sprint.service';
import {IssueService} from '../../services/issue.service';
import {PersistenceService} from '../../services/persistence.service';
import {DexieService} from '../../services/dexie.service';

describe('NewSprintComponent', () => {
  let component: NewSprintComponent;
  let fixture: ComponentFixture<NewSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewSprintComponent, SprintLabelPipe],
      imports: [TranslateModule.forRoot(), FormsModule, ReactiveFormsModule, NgbModule.forRoot()],
      providers: [
          IssueService,
          SprintService,
          PersistenceService,
          DexieService,
          {provide: NgbActiveModal, useClass: MockModalDialog}
      ]
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

class MockModalDialog {

}
