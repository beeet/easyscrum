import {Injectable} from '@angular/core';
import {DexieService} from './dexie.service';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor(private dexieService: DexieService) {
  }

  loadSprints() {
    return this.dexieService.sprints.toArray();
  }

  loadAssignees() {
    return this.dexieService.assignees.toArray();
  }

  loadIssues() {
    return this.dexieService.issues.toArray();
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
