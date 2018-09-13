import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import {Sprint} from './sprint';
import {Assignee} from './assignee';
import {Issue} from './issue';

@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie {

  sprints: Dexie.Table<Sprint, string>;
  assignees: Dexie.Table<Assignee, string>;
  issues: Dexie.Table<Issue, string>;

  constructor() {
    super('EasyScrumDB');
    this.version(1).stores({
      sprints: 'id',
      assignees: 'id',
      issues: 'id'
    });
    this.sprints.mapToClass(Sprint);
    this.assignees.mapToClass(Assignee);
    this.issues.mapToClass(Issue);
    // Man kann wohl die Klassen zu den Tabellen mappen, aber die in den Klassen verwendeten Klassen ist einfache Objekte
    this.issues.hook('reading', issue => {
      return Issue.get(issue);
    });
  }
}
