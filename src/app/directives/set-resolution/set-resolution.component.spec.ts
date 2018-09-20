import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {SetResolutionComponent} from './set-resolution.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

describe('SetResolutionComponent', () => {
  let component: SetResolutionComponent;
  let fixture: ComponentFixture<SetResolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetResolutionComponent ],
      imports: [TranslateModule.forRoot(), FormsModule]
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
