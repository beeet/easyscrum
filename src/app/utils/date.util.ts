export class DateUtil  {
  now(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  newDate(year: number, month: number, day: number): Date {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
