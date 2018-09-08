import {Crud} from './crud';
import {UUID} from 'angular2-uuid';
import {Sprint} from './sprint';
import {DateUtil} from '../utils/date.util';
import {sprintData} from './DUMMY_DATA';
import {isAfter, isBefore, isEqual} from 'date-fns';

export class SprintService implements Crud<Sprint> {
  private sprints: Sprint[] = [];
  private dateUtil = new DateUtil();

  constructor() {

  }

  create(): Sprint {
    const newSprint = new Sprint();
    newSprint.id = UUID.UUID();
    return newSprint;
  }

  getAll(): Sprint[] {
    return this.sprints;
  }

  get(id: string): Sprint {
    return this.sprints.find(s => s.id === id);
  }

  put(sprint: Sprint) {
    return this.sprints.push(sprint);
  }

  delete(id: string) {
    const index = this.sprints.findIndex(s => s.id === id);
    this.sprints.splice(index, 1);
  }

  getCurrent(): Sprint {
    const now = this.dateUtil.now();
    return this.sprints.find(s =>
      (isBefore(s.begin, now) || isEqual(s.begin, now))
      && (isAfter(s.end, now) || isEqual(s.end, now)));
  }

  getLatest(): Sprint {
    const now = this.dateUtil.now();
    return this.sprints.slice(-1)[0];
  }

  getAllWithoutSprintInTheFuture(): Sprint[] {
    const now = this.dateUtil.now();
    return this.sprints.filter(s => {
      return isBefore(s.begin, now) || isEqual(s.begin, now);
    });
  }

  isSprintAlreadyStarted(id: string): boolean {
    const sprint = this.get(id);
    if (!sprint) {
      return false;
    }
    return isBefore(sprint.begin, this.dateUtil.now());
  }

  setupDummyData() {
    for ( const d of sprintData ) {
      const dummy = this.create();
      dummy.id = d.sprintId;
      dummy.name = d.name;
      dummy.begin = d.begin;
      dummy.end = d.end;
      this.put(dummy);
    }
  }
}
