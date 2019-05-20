import { PureComputed } from '@devexpress/dx-core';

export type SchedulerTime = Date | number | string;
export type AppointmentId = number | string;
export type CellElement = React.ReactInstance;

/** Describes an appointment data object. */
export interface AppointmentModel {
  /** The start date. */
  startDate: SchedulerTime;
  /** The end date. */
  endDate: SchedulerTime;
  /** The title. */
  title?: string;
  /** The all day flag. */
  allDay?: boolean;
  /** The identifier. */
  id?: number | string;
  /** Any other properties. */
  [propertyName: string]: any;
}

export interface Appointment {
  /** The start date. */
  start: SchedulerTime;
  /** The end date. */
  end: SchedulerTime;
  /** The all day flag. */
  allDay?: boolean;
  /** The recurrence rule. */
  rRule?: string;
  /** The exception date-times. */
  exDate?: string;
  /** The all appointment data */
  dataItem: AppointmentModel;
}

export interface TimeScale {
  start: Date;
  end: Date;
}

export type AllDayCell = {
  startDate: SchedulerTime;
  endDate: SchedulerTime;
};

/** Describes a cell data configuration object. */
export interface ViewCell {
  /** Specifies the cell start time. */
  startDate: Date;
  /** Specifies the cell end time. */
  endDate?: Date;
  /** Indicates whether the cell's date is not in the current month. */
  otherMonth?: boolean;
  /** Indicates whether the cell's date is today. */
  today?: boolean;
}

export type DayScaleFn = PureComputed<
  [Date, number, number, number[]], Date[]
>;

export type TimeScaleFn = PureComputed<
  [Date, number, number, number, number, number[]], TimeScale[]
>;

export type ViewCellsDataFn = PureComputed<
  [Date, number | undefined, number | undefined, number[],
    number, number, number, SchedulerTime], ViewCell[][]
>;

export type FormatterFn = (
  nextDate: SchedulerTime | undefined, nextOptions: Intl.DateTimeFormatOptions,
) => string;

export type FormatDateTimeGetterFn = (locale: string | string[]) => FormatterFn;

export type DateTimeFormatInstanceFn = (
  locale: string | string[], formatOptions: Intl.DateTimeFormatOptions,
) => Intl.DateTimeFormat;
