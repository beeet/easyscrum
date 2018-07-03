import { TestBed, inject } from '@angular/core/testing';

import {IssueService} from './issue.service';
import {Issue} from './issue';
import {IssueType} from './issueType';
import {IssueState} from './issueState';

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
    const {one, two} = setupTestdata();
    // act + assert
    expect(service.put(one)).toBe(1);
    expect(service.put(two)).toBe(2);
    expect(service.getAll().length).toBe(2);
    expect(service.get('1')).toBe(one);
    expect(service.get('2')).toBe(two);
    expect(service.get('3')).toBe(undefined);
    service.delete('2');
    expect(service.getAll().length).toBe(1);
  }));

  it('test filters on service', inject([IssueService], (service: IssueService) => {
    // arrange
    const {one, two} = setupTestdata();
    service.put(one);
    service.put(two);
    // act + assert
    expect(service.getAllFilteredByType(IssueType.task)).toEqual([one]);

    expect(service.getAllFilteredByState(IssueState.done)).toEqual([two]);
    expect(service.getAllFilteredByState(IssueState.intest)).toEqual([]);
  }));

  it('is deletion allowed', inject([IssueService], (service: IssueService) => {
    // arrange
    // act + assert
    const issue = new Issue();
    expect(service.isDeletionIssueAllowed(issue)).toEqual(true);
    issue.sprintId = '1';
    expect(service.isDeletionIssueAllowed(issue)).toEqual(false);
  }));
});

function setupTestdata() {
  const one = new Issue();
  one.id = '1';
  one.description = 'one';
  one.type = IssueType.task;
  one.state = IssueState.open;
  const two = new Issue();
  two.id = '2';
  two.description = 'two';
  two.type = IssueType.story;
  two.state = IssueState.done;
  return {one, two};
}
