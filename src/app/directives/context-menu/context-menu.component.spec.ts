import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContextMenuComponent} from './context-menu.component';
import {TranslateModule} from '@ngx-translate/core';
import {IssueService} from '../../services/issue.service';
import {PersistenceService} from '../../services/persistence.service';
import {DexieService} from '../../services/dexie.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SprintService} from '../../services/sprint.service';
import {RouterTestingModule} from '@angular/router/testing';

xdescribe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextMenuComponent ],
      imports: [TranslateModule.forRoot(), RouterTestingModule.withRoutes([])],
      providers: [
        IssueService,
        SprintService,
        PersistenceService,
        DexieService,
        {provide: NgbModal, useClass: MockModal}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockModal {

}
