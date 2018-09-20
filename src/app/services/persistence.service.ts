import {Injectable} from '@angular/core';
import {DexieService} from './dexie.service';
import {Issue} from './issue';
import {Assignee} from './assignee';
import {Sprint} from './sprint';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor(private dexieService: DexieService) {
  }

  loadSprints(): Promise<Array<Sprint>> {
    return this.dexieService.sprints.toArray();
  }

  loadAssignees(): Promise<Array<Assignee>> {
    return this.dexieService.assignees.toArray();
  }

  loadIssues(): Promise<Array<Issue>> {
    return this.dexieService.issues.toArray();
  }

  upsertIssue(issue: Issue): Promise<string> {
    return this.dexieService.issues.put(issue);
  }

  upsertIssues(issues: Issue[]): Promise<string> {
    return this.dexieService.issues.bulkPut(issues);
  }

  deleteIssue(id: string): Promise<void> {
    return this.dexieService.issues.delete(id);
  }

  insertAssignee(assignee: Assignee): Promise<string> {
    return this.dexieService.assignees.add(assignee);
  }

  deleteAssignee(id: string): Promise<void> {
    return this.dexieService.assignees.delete(id);
  }

  insertSprint(sprint: Sprint): Promise<string> {
    return this.dexieService.sprints.add(sprint);
  }

  deleteSprint(id: string): Promise<void> {
    return this.dexieService.sprints.delete(id);
  }

  // TODO: wieder entfernen; diese Methoden braucht es nur um die Dummy-Daten in die indexedDB zu laden.
  storeSprints(sprints) {
    return this.dexieService.sprints.bulkAdd(sprints);
  }

  storeAssignees(assignees) {
    return this.dexieService.assignees.bulkAdd(assignees);
  }

  storeIssues(issues) {
    return this.dexieService.issues.bulkAdd(issues);
  }
}
