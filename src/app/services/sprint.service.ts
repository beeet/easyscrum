import {Crud} from './crud';
import {UUID} from 'angular2-uuid';
import {Sprint} from './sprint';
import {DateUtil} from '../utils/date.util';
import {sprintData} from './DUMMY_DATA';
import {isAfter, isBefore, isEqual} from 'date-fns';
import {PersistenceService} from './persistence.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SprintService implements Crud<Sprint> {
  private sprints: Sprint[] = [];
  private dateUtil = new DateUtil();

  constructor(private persistence: PersistenceService) {
    this.persistence.loadSprints()
      .then(sprints => this.sprints = sprints)
      .catch(e => console.error(e));
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

  put(sprint: Sprint): void {
    this.persistence.insertSprint(sprint)
      .then(() => this.sprints.push(sprint))
      .catch(e => console.error(e));
    return;
  }

  delete(id: string) {
    this.persistence.deleteSprint(id)
      .then(() => {
        const index = this.sprints.findIndex(s => s.id === id);
        this.sprints.splice(index, 1);
      })
      .catch(e => console.error(e));
  }

  getCurrent(): Sprint {
    const now = this.dateUtil.now();
    return this.sprints.find(s =>
      (isBefore(s.begin, now) || isEqual(s.begin, now))
      && (isAfter(s.end, now) || isEqual(s.end, now)));
  }

  getLatest(): Sprint {
    return this.sprints.slice(-1)[0];
  }

  getAllWithoutSprintInTheFuture(): Sprint[] {
    const now = this.dateUtil.now();
    return this.sprints.filter(s => {
      return isBefore(s.begin, now) || isEqual(s.begin, now);
    });
  }

  getAllWithoutSprintInThePast(): Sprint[] {
    const now = this.dateUtil.now();
    return this.sprints.filter(s => {
      return isAfter(s.end, now);
    });
  }

  getNext(): Sprint {
    const current = this.getCurrent();
    if (current) {
      const nextSprints = this.sprints.filter(s => isAfter(s.begin, current.end));
      nextSprints.sort((a, b) => a.end > b.end ? 1 : -1);
      return nextSprints[0];
    }
  }

  isSprintAlreadyStarted(id: string): boolean {
    const sprint = this.get(id);
    if (!sprint) {
      return false;
    }
    return isBefore(sprint.begin, this.dateUtil.now());
  }

  setupDummyData() {
    const sprints: Sprint[] = [];
    for (const d of sprintData) {
      const dummy = this.create();
      dummy.id = d.sprintId;
      dummy.name = d.name;
      dummy.begin = d.begin;
      dummy.end = d.end;
      sprints.push(dummy);
    }
    this.persistence.storeSprints(sprints)
      .catch(e => console.error(e));
  }
}
