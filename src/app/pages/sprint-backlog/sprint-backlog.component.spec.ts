import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SprintBacklogComponent} from './sprint-backlog.component';
import {TranslateModule} from '@ngx-translate/core';
import {DragulaModule} from 'ng2-dragula';
import {RouterTestingModule} from '@angular/router/testing';
import {ContextMenuComponent} from '../../directives/context-menu/context-menu.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalDialogService} from 'ngx-modal-dialog';
import {ModalDialogInstanceService} from 'ngx-modal-dialog/src/modal-dialog-instance.service';

describe('SprintBacklogComponent', () => {
  let component: SprintBacklogComponent;
  let fixture: ComponentFixture<SprintBacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprintBacklogComponent, ContextMenuComponent],
      imports: [TranslateModule.forRoot(), DragulaModule, RouterTestingModule, NgbModule.forRoot()],
      providers: [ModalDialogService, ModalDialogInstanceService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
