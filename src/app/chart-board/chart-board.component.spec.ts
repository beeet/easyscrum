import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBoardComponent } from './chart-board.component';

describe('ChartBoardComponent', () => {
  let component: ChartBoardComponent;
  let fixture: ComponentFixture<ChartBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
