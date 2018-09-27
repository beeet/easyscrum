import {Crud} from './crud';
import {UUID} from 'angular2-uuid';
import {Assignee} from './assignee';
import {assigneeData} from './DUMMY_DATA';
import {Injectable} from '@angular/core';
import {PersistenceService} from './persistence.service';

@Injectable({
  providedIn: 'root'
})
export class AssigneeService implements Crud<Assignee> {
  private availableAvatar = [
    'barca', 'batman', 'calimero', 'capt.america', 'cowboy',
    'devil', 'elvis', 'eminem', 'firefighter', 'gandalf',
    'gladiator', 'king', 'mickey', 'motherboard', 'mr.t',
    'obelix', 'pilot', 'pirat', 'poolboy', 'rambo',
    'surgeon', 'tux', 'wikinger'];
  private assignees: Assignee[] = [];

  constructor(private persistence: PersistenceService) {
    this.persistence.loadAssignees().then(assignees => {
      this.assignees = assignees;
    })
      .catch(e => console.error(e));
  }

  create(): Assignee {
    const newAssignee = new Assignee();
    newAssignee.id = UUID.UUID();
    newAssignee.avatar = this.resolveAvailableAvatar();
    return newAssignee;
  }

  getAll(): Assignee[] {
    return this.assignees;
  }

  get(id: string): Assignee {
    return this.assignees.find(a => a.id === id);
  }

  put(assignee: Assignee): void {
    this.persistence.insertAssignee(assignee)
      .then(() => this.assignees.push(assignee))
      .catch(e => console.error(e));
  }

  delete(id: string): void {
    this.persistence.deleteAssignee(id)
      .then(() => {
        const index = this.assignees.findIndex(a => a.id === id);
        this.assignees.splice(index, 1);
      })
      .catch(e => console.error(e));
  }

  getAvatar(assigneeId: string): string {
    let url;
    if (assigneeId) {
      const assignee = this.get(assigneeId);
      if (assignee) {
        url = `./assets/pics/avatar/${assignee.avatar}.png`;
      } else {
        url = './assets/pics/avatar/unbekannt.png';
      }
    } else {
      url = './assets/pics/avatar/unbekannt.png';
    }
    return url;
  }

  resolveAvatarInUse(): Set<string> {
    const inUse = new Set();
    this.assignees.forEach(value => {
      if (value.avatar && value.avatar !== '') {
        inUse.add(value.avatar);
      }
    });
    return inUse;
  }

  resolveAvailableAvatar(): string {
    const inUse = this.resolveAvatarInUse();
    for (const item of this.availableAvatar) {
      if (!inUse.has(item)) {
        return item;
      }
    }
    return '';
  }

  setupDummyData() {
    const assignees: Assignee[] = [];
    for (const d of assigneeData) {
      const dummy = this.create();
      dummy.id = d.id;
      dummy.nickname = d.nickname;
      dummy.avatar = d.avatar;
      assignees.push(dummy);
    }
    this.persistence.storeAssignees(assignees)
      .then(r => console.log(r))
      .catch(e => console.error(e));
  }
}
