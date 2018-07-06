import { TestBed, inject } from '@angular/core/testing';
import {DateUtil} from './date.util';
import moment = require('moment');

describe('DateUtil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateUtil]
    });
  });

  it('now', inject([DateUtil], (dateUtil: DateUtil) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    expect(dateUtil.now()).toEqual(moment(date));
  }));

  it('newDate', inject([DateUtil], (dateUtil: DateUtil) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    expect(dateUtil.now()).toEqual(moment(date));
  }));
});


