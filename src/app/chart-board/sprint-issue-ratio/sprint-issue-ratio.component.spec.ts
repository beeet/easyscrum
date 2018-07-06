import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintIssueRatioComponent } from './sprint-issue-ratio.component';

describe('SprintIssueRatioComponent', () => {
  let component: SprintIssueRatioComponent;
  let fixture: ComponentFixture<SprintIssueRatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintIssueRatioComponent ]
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
