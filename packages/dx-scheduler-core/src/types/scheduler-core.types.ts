import { PureComputed } from '@devexpress/dx-core';

export type ExcludedDays = number[];
export type CurrentViewType = string;
export type CurrentDate = Date;
export type Today = Date;
export type FirstDayOfWeek = number;
export type DayCount = number;
export type StartDayHour = number;
export type EndDayHour = number;
export type CellDuration = number;
export type ViewName = string;
export type CurrentTime = Date | number | string;
export type AppointmentDate = Date | number | string;
export type StartViewDate = Date;
export type EndViewDate = Date;
export type IntervalCount = number;
export type Index = number | string;
export type CellElement = React.ReactInstance;
export type Multiline = boolean;

/** Describes an appointment data object that the `mapAppointmentData` function should return. */
export interface AppointmentModel {
  /** The start date. */
  startDate: Date | string | number;
  /** The end date. */
  endDate: Date | string | number;
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
  start: Date | string | number;
  /** The end date. */
  end: Date | string | number;
  /** The all day flag. */
  allDay?: boolean;
  /** The all appointment data */
  dataItem: AppointmentModel;
}

export interface TimeScale {
  start: Date;
  end: Date;
}

export type AllDayCell = {
  startDate: Date | string | number;
  endDate: Date | string | number;
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
  [CurrentDate, FirstDayOfWeek, DayCount, ExcludedDays], Date[]
>;

export type TimeScaleFn = PureComputed<
  [CurrentDate, FirstDayOfWeek, StartDayHour, EndDayHour, CellDuration, ExcludedDays], TimeScale[]
>;

export type ViewCellsDataFn = PureComputed<
  [CurrentDate, FirstDayOfWeek, DayCount, ExcludedDays,
    StartDayHour, EndDayHour, CellDuration, CurrentTime], ViewCell[][]
>;
