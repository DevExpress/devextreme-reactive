import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { Appointment, SchedulerDateTime } from './scheduler-core.types';
import { Grouping } from './grouping-state.types';
import { ValidResource } from './resources.types';
import { GroupingItem } from './integrated-grouping.types';

export type ViewCellData = {
  startDate: Date;
  endDate: Date;
  groupingInfo?: GroupingItem[];
};

export interface AppointmentMoment {
  start: moment.Moment;
  end: moment.Moment;
  title?: string;
  allDay?: boolean;
  id?: number | string;
  [propertyName: string]: any;
}
/** @internal */
export type CalculateAllDayDateAndGroupIntervalsFn = PureComputed<
  [Appointment[], Date, Date, number[], Grouping[],
  ValidResource[], GroupingItem[][]], AppointmentMoment[]
>;
/** @internal */
export type GetAllDayCellIndexByAppointmentDataFn = PureComputed<
  [ViewCellData[][], SchedulerDateTime, AppointmentMoment, boolean], number
>;
/** @internal */
export type SliceAppointmentsByBoundariesFn = PureComputed<
  [AppointmentMoment, Date, Date, number[]], AppointmentMoment[]
>;
