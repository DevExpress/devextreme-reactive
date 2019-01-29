import moment from 'moment';

export type TimeBounds = { left: moment.Moment, right: moment.Moment };
export type Step = number;

/** Describes a cell data configuration object. */
export interface MonthCellData {
  /** Specifies the cell start time. */
  startDate: Date;
  /** Specifies the cell end time. */
  endDate: Date;
  /** Indicates whether the cell's date is not in the current month. */
  otherMonth: boolean;
  /** Indicates whether the cell's date is today. */
  today: boolean;
}
