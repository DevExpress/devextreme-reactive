import { PureComputed } from '@devexpress/dx-core';

export type SchedulerDateTime = Date | number | string;
export type AppointmentId = number | string;
/** @internal */
export type CellElement = React.ReactInstance;

/** Describes an appointment data object. */
export interface AppointmentModel {
  /** The start date. */
  startDate: SchedulerDateTime;
  /** The end date. */
  endDate: SchedulerDateTime;
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
  start: SchedulerDateTime;
  /** The end date. */
  end: SchedulerDateTime;
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
  startDate: SchedulerDateTime;
  endDate: SchedulerDateTime;
};

/** @internal */
export interface ViewCell {
  startDate: Date;
  endDate?: Date;
  otherMonth?: boolean;
  today?: boolean;
}
/** @internal */
export type DayScaleFn = PureComputed<
  [Date, number, number, number[]], Date[]
>;
/** @internal */
export type TimeScaleFn = PureComputed<
  [Date, number, number, number, number, number[]], TimeScale[]
>;
/** @internal */
export type ViewCellsDataFn = PureComputed<
  [Date, number | undefined, number | undefined, number[],
    number, number, number, SchedulerDateTime], ViewCell[][]
>;

export type FormatterFn = (
  nextDate: SchedulerDateTime | undefined, nextOptions: Intl.DateTimeFormatOptions,
) => string;
/** @internal */
export type FormatDateTimeGetterFn = (locale: string | string[]) => FormatterFn;
/** @internal */
export type DateTimeFormatInstanceFn = (
  locale: string | string[], formatOptions: Intl.DateTimeFormatOptions,
) => Intl.DateTimeFormat;
