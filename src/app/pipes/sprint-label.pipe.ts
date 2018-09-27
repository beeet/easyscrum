import {Pipe, PipeTransform} from '@angular/core';
import {Sprint} from '../services/sprint';
import {format} from 'date-fns';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
    name: 'sprintLabel'
})
export class SprintLabelPipe implements PipeTransform {

  constructor(private translate: TranslateService) {}

    transform(sprint: Sprint, args?: any): string {
        if (sprint) {
          return sprint.name + ' '
            + '('
            + format(sprint.begin, 'DD.MM.YYYY')
            + ' - '
            + format(sprint.end, 'DD.MM.YYYY')
            + ')';
        } else {
          return this.translate.instant('new-sprint.no.sprint');
        }
    }

}
