import moment from 'moment';

export type LeftBound = Date;
export type RightBound = Date;
export type ExcludedDays = number[];
export type ViewCellData = { startDate: Date; endDate: Date; };
export type TakePrevious = boolean;

export interface AppointmentMoment {
  start: moment.Moment;
  end: moment.Moment;
  title?: string;
  allDay?: boolean;
  id?: number | string;
  [propertyName: string]: any;
}
