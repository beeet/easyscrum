import {Moment} from 'moment';
import * as moment from 'moment';


export class DateUtil  {
  now(): Moment {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return moment(date);
  }

  newDate(date: Date): Moment {
    date.setHours(0, 0, 0, 0);
    return moment(date);
  }
}
