import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  CurrentDate, FirstDayOfWeek, IntervalCount, Today, AppointmentCore, AppointmentDate, Index,
} from './scheduler-core.types';
import {
  LeftBound, RightBound, AppointmentMoment, ViewCellData, TakePrevious,
} from './all-day-panel.types';

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

export type MonthCellsDataComputed = PureComputed<
  [CurrentDate, FirstDayOfWeek, IntervalCount, Today], MonthCellData[][]
>;

export type CalculateMonthDateIntervals = PureComputed<
  [AppointmentCore[], LeftBound, RightBound], AppointmentMoment[]
>;

export type SliceAppointmentByWeek = PureComputed<
  [TimeBounds, AppointmentMoment, Step], AppointmentMoment[]
>;

export type GetMonthCellIndexByDate = PureComputed<
  [ViewCellData[][], AppointmentDate, TakePrevious], Index
>;
