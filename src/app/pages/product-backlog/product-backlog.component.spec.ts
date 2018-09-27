import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBacklogComponent } from './product-backlog.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {FilterTableComponent} from '../../directives/filter-table/filter-table.component';
import {ContextMenuComponent} from '../../directives/context-menu/context-menu.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

xdescribe('ProductBacklogComponent', () => {
  let component: ProductBacklogComponent;
  let fixture: ComponentFixture<ProductBacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBacklogComponent, FilterTableComponent, ContextMenuComponent ],
      imports: [TranslateModule.forRoot(), FormsModule, RouterTestingModule, NgbModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
