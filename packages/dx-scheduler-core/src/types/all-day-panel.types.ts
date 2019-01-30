import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { AppointmentCore, AppointmentDate, ExcludedDays } from './scheduler-core.types';

export type LeftBound = Date;
export type RightBound = Date;
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

export type CalculateAllDayDateIntervals = PureComputed<
  [AppointmentCore[], LeftBound, RightBound, ExcludedDays], AppointmentMoment[]
>;

export type GetAllDayCellIndexByDate = PureComputed<
  [ViewCellData[][], AppointmentDate, TakePrevious], number
>;

export type SliceAppointmentsByBoundaries = PureComputed<
  [AppointmentMoment, LeftBound, RightBound, ExcludedDays], AppointmentMoment[]
>;
