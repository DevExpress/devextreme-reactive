import moment from 'moment';

export type LeftBound = Date;
export type RightBound = Date;
export type ExcludedDays = number[];

export type ViewCellData = { startDate: Date; endDate: Date; };
export type TakePrevious = boolean;

export interface AppointmentMoment {
  /** The appointment start date */
  start: moment.Moment;
  /** The appointment end date */
  end: moment.Moment;
  /** The title. */
  title?: string;
  /** The all day flag. */
  allDay?: boolean;
  /** The identifier. */
  id?: number | string;
  /** Any other properties. */
  [propertyName: string]: any;
}
