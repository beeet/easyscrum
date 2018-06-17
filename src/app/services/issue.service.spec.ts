import { TestBed, inject } from '@angular/core/testing';

import {Issue, IssueService} from './issue.service';

describe('IssueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssueService]
    });
  });

  it('should be created', inject([IssueService], (service: IssueService) => {
    expect(service).toBeTruthy();
  }));


  it('teset crud on service', inject([IssueService], (service: IssueService) => {
    // arrange
    const one = new Issue();
    one.id = 1;
    one.description = 'one';
    const two = new Issue();
    two.id = 2;
    two.description = 'two';
    // act + assert
    expect(service.put(one)).toBe(1);
    expect(service.put(two)).toBe(2);
    expect(service.getAll().length).toBe(2);
    expect(service.get(1)).toBe(one);
    expect(service.get(2)).toBe(two);
    expect(service.get(3)).toBe(undefined);
    service.delete(2);
    expect(service.getAll().length).toBe(1);
  }));
});
