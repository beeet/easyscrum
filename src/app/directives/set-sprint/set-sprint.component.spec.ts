import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSprintComponent } from './set-sprint.component';

describe('SetSprintComponent', () => {
  let component: SetSprintComponent;
  let fixture: ComponentFixture<SetSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
