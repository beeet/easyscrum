import {Crud} from './crud';
import {UUID} from 'angular2-uuid';
import {Sprint} from './sprint';

export class SprintService implements Crud<Sprint>{
  private sprints: Sprint[] = [];

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

  get(id: string) {
    return this.sprints.find(s => s.id === id);
  }

  put(sprint: Sprint) {
    return this.sprints.push(sprint);
  }

  delete(id: string) {
    const index = this.sprints.findIndex(s => s.id === id);
    this.sprints.splice(index, 1);
  }

  setupDummyData() {
      const s1 = this.create();
      s1.name = 'Sprint KW24-25';
      s1.begin = new Date(2018, 5, 11);
      s1.end = new Date(2018, 5, 24);
      this.put(s1);
      const s2 = this.create();
      s2.name = 'Sprint KW26-27';
      s2.begin = new Date(2018, 5, 25);
      s2.end = new Date(2018, 6, 8);
      this.put(s2);
      const s3 = this.create();
      s3.name = 'Sprint KW28-29';
      s3.begin = new Date(2018, 6, 9);
      s3.end = new Date(2018, 6, 22);
      this.put(s3);
  }
}
