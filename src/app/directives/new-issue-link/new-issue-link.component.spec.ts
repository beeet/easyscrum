import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NewIssueLinkComponent} from './new-issue-link.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('NewIssueLinkComponent', () => {
  let component: NewIssueLinkComponent;
  let fixture: ComponentFixture<NewIssueLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIssueLinkComponent ],
      imports: [TranslateModule.forRoot(), FormsModule, NgbModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIssueLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
