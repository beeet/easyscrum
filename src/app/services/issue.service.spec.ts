import { TestBed, inject } from '@angular/core/testing';

import {IssueService} from './issue.service';
import {Issue} from './issue';

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
    one.id = '1';
    one.description = 'one';
    const two = new Issue();
    two.id = '2';
    two.description = 'two';
    // act + assert
    expect(service.put(one)).toBe(3);
    expect(service.put(two)).toBe(4);
    expect(service.getAll().length).toBe(4);
    expect(service.get('1')).toBe(one);
    expect(service.get('2')).toBe(two);
    expect(service.get('3')).toBe(undefined);
    service.delete('2');
    expect(service.getAll().length).toBe(3);
  }));
});
