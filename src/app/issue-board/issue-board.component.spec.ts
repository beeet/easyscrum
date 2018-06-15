import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueBoardComponent } from './issue-board.component';

describe('IssueBoardComponent', () => {
  let component: IssueBoardComponent;
  let fixture: ComponentFixture<IssueBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueBoardComponent ]
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
