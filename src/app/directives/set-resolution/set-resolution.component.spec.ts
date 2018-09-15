import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {SetResolutionComponent} from './set-resolution.component';

describe('SetResolutionComponent', () => {
  let component: SetResolutionComponent;
  let fixture: ComponentFixture<SetResolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetResolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
