import {Crud} from './crud';
import {UUID} from 'angular2-uuid';
import {Assignee} from './assignee';
import {assigneeData} from './DUMMY_DATA';

export class AssigneeService implements Crud<Assignee> {
    private availableAvatar = [
        'barca', 'batman', 'calimero', 'capt.america', 'cowboy',
        'devil', 'elvis', 'eminem', 'firefighter', 'gandalf',
        'gladiator', 'king', 'mickey', 'motherboard', 'mr.t',
        'obelix', 'pilot', 'pirat', 'poolboy', 'rambo',
        'surgeon', 'tux', 'wikinger'];
    private assignees: Assignee[] = [];

    constructor() {

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

    get(id: string) {
        return this.assignees.find(a => a.id === id);
    }

    put(assignee: Assignee) {
        return this.assignees.push(assignee);
    }

    delete(id: string) {
        const index = this.assignees.findIndex(a => a.id === id);
        this.assignees.splice(index, 1);
    }

    getAvatar(assigneeId: string): string {
        const avatar = this.get(assigneeId).avatar;
        return 'http://localhost:4200/assets/pics/avatar/' + avatar + '.png';
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
        for (const d of assigneeData) {
            const dummy = this.create();
            dummy.id = d.id;
            dummy.nickname = d.nickname;
            dummy.avatar = d.avatar;
            this.put(dummy);
        }
    }
}
