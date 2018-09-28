import {TestBed, inject} from '@angular/core/testing';

import {SprintService} from './sprint.service';
import {Sprint} from './sprint';
import {DateUtil} from '../utils/date.util';
import {addDays} from 'date-fns';

function setupData(service: SprintService, begin: Date, end: Date) {
  const sprint = new Sprint();
  sprint.begin = begin;
  sprint.end = end;
  service.put(sprint);
  return sprint;
}

const dateUtil = new DateUtil();
const now = dateUtil.now();

describe('SprintService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprintService]
    });
  });

  it('should be created', inject([SprintService], (service: SprintService) => {
    expect(service).toBeTruthy();
  }));

  xit('getCurrent sprint - between', inject([SprintService], (service: SprintService) => {
    // arrage
    const sprint = setupData(service, addDays(now, -1), addDays(now, 1));
    // act
    const result = service.getCurrent();
    // assert
    expect(result).toEqual(sprint);
  }));

  xit('getCurrent sprint - same day', inject([SprintService], (service: SprintService) => {
    // arrage
    const sprint = setupData(service, now, now);
    // act
    const result = service.getCurrent();
    // assert
    expect(result).toEqual(sprint);
  }));

  it('getCurrent sprint - before', inject([SprintService], (service: SprintService) => {
    // arrage
    const date = addDays(now, -1);
    const sprint = setupData(service, date, date);
    // act
    const result = service.getCurrent();
    // assert
    expect(result).toEqual(undefined);
  }));

  it('getCurrent sprint - after', inject([SprintService], (service: SprintService) => {
    // arrage
    const date = addDays(now, 1);
    const sprint = setupData(service, date, date);
    // act
    const result = service.getCurrent();
    // assert
    expect(result).toEqual(undefined);
  }));
});
