import {Pipe, PipeTransform} from '@angular/core';
import {Sprint} from '../services/sprint';
import {format} from 'date-fns';

@Pipe({
    name: 'sprintLabel'
})
export class SprintLabelPipe implements PipeTransform {

    transform(sprint: Sprint, args?: any): string {
        return sprint.name + ' '
            + '('
            + format(sprint.begin, 'DD.MM.YYYY')
            + ' - '
            + format(sprint.end, 'DD.MM.YYYY')
            + ')';
    }

}
