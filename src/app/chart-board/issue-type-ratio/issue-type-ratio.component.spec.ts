import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTypeRatioComponent } from './issue-type-ratio.component';

describe('IssueTypeRatioComponent', () => {
  let component: IssueTypeRatioComponent;
  let fixture: ComponentFixture<IssueTypeRatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueTypeRatioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTypeRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
