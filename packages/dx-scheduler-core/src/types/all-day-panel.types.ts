import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { Appointment, SchedulerDateTime } from './scheduler-core.types';

export type ViewCellData = { startDate: Date; endDate: Date; };

export interface AppointmentMoment {
  start: moment.Moment;
  end: moment.Moment;
  title?: string;
  allDay?: boolean;
  id?: number | string;
  [propertyName: string]: any;
}
/** @internal */
export type CalculateAllDayDateIntervalsFn = PureComputed<
  [Appointment[], Date, Date, number[]], AppointmentMoment[]
>;
/** @internal */
export type GetAllDayCellIndexByDateFn = PureComputed<
  [ViewCellData[][], SchedulerDateTime, boolean], number
>;
/** @internal */
export type SliceAppointmentsByBoundariesFn = PureComputed<
  [AppointmentMoment, Date, Date, number[]], AppointmentMoment[]
>;
