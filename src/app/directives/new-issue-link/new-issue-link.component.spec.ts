import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewIssueLinkComponent} from './new-issue-link.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IssueService} from '../../services/issue.service';
import {PersistenceService} from '../../services/persistence.service';
import {DexieService} from '../../services/dexie.service';
import {Issue} from '../../services/issue';

describe('NewIssueLinkComponent', () => {
  let component: NewIssueLinkComponent;
  let fixture: ComponentFixture<NewIssueLinkComponent>;

  const issues = [
    getIssue('relatedIssue-1'), getIssue('relatedIssue-2')
  ];

  const issue = getIssue('baseIssue');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIssueLinkComponent ],
      imports: [TranslateModule.forRoot(), FormsModule, NgbModule.forRoot()],
      providers: [
        IssueService,
        PersistenceService,
        DexieService,
        {provide: NgbActiveModal, useClass: MockModalDialog}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIssueLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const issueService = TestBed.get(IssueService);
    spyOn(issueService, 'getAll').and.returnValue(issues);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    expect(component.issues).toEqual([]);
    component.ngOnInit();
    expect(component.issues).not.toBeUndefined();
    expect(component.issues.length).toBe(2);
  });

  xit('save', () => {
    expect(issue.issueLinks).toEqual([]);
    // prepare
    component.baseIssue = issue;
    component.issueLinkTypeString = 'blocks';
    component.relatedIssueId = 'ID';
    // run
    component.save();
    // verify
    expect(issue.issueLinks.length).toBe(1);
  });
});

class MockModalDialog {

}

function getIssue(id) {
  const issue = new Issue();
  issue.id = id;
  return issue;
}
