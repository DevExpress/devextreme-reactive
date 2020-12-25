import { PureComputed } from '@devexpress/dx-core';
import { Group } from '../types';

export type SchedulerDateTime = Date | number | string;
export type AppointmentId = number | string;
/** @internal */
export type CellElement = React.ReactInstance;
/** @internal */
export type AppointmentKey = AppointmentId;

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
  /** Specifies the appointment recurrence rule. */
  rRule?: string | undefined;
  /** Specifies dates excluded from recurrence. */
  exDate?: string | undefined;
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
  /** @internal */
  key: AppointmentKey;
}

export interface TimeScale {
  start: Date;
  end: Date;
}
/** Describes an AllDay cell data configuration object. */
export type AllDayCell = {
  /** The cell’s start time. */
  startDate: SchedulerDateTime;
  /** The cell’s end time. */
  endDate: SchedulerDateTime;
  /** Information about the cell's grouping. */
  groupingInfo?: Group[];
  /** "true" if this cell is last in its group. */
  endOfGroup?: boolean;
};

/** @internal */
export interface ViewCell {
  startDate: Date;
  endDate?: Date;
  otherMonth?: boolean;
  today?: boolean;
  groupingInfo?: Group[];
  endOfGroup?: boolean;
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

/** Describes a current view object. */
export interface SchedulerView {
  /** View's unique identifier. */
  name: string;
  /** View's visible name. */
  displayName: string;
}
export type ScrollingStrategy = {
  topBoundary: number;
  bottomBoundary: number;
  leftBoundary: number;
  rightBoundary: number;
  fixedTopHeight?: number;
  fixedLeftWidth?: number;
  changeVerticalScroll: (value: number) => void;
  changeHorizontalScroll: (value: number) => void;
};

export type CellElementsMeta = {
  parentRect: () => ClientRect | DOMRect,
  getCellRects: Array<() => ClientRect | DOMRect>,
};
