import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { AppointmentModel } from './scheduler-core.types';
import { Rect } from './horizontal-rect.types';
import { AppointmentMoment } from './all-day-panel.types';

/** @internal */
export type Interval = [moment.Moment, moment.Moment];
interface GroupItem {
  start: moment.Moment;
  end: moment.Moment;
  dataItem: AppointmentModel;
  offset: number;
}

/** @internal */
export type AppointmentGroup = {
  items: GroupItem[];
  reduceValue: number;
};

/** @internal */
export interface AppointmentUnwrappedGroup extends GroupItem {
  reduceValue: number;
  fromPrev: boolean;
  toNext: boolean;
}

/** @internal */
export interface ElementRect extends Rect {
  dataItem: AppointmentModel;
  type: string;
  fromPrev: boolean;
  toNext: boolean;
}
/** @internal */
export type ComputedHelperFn = PureComputed<
  [any, string, (...args: any[]) => any, any]
>;
/** @internal */
export type ViewPredicateFn = PureComputed<
  [AppointmentMoment, Date, Date, number[]?, boolean?], boolean
>;
/** @internal */
export type CalculateFirstDateOfWeekFn = PureComputed<
  [Date, number, number[]], Date
> ;
/** @internal */
export type RectCalculatorBaseFn = PureComputed<
  [AppointmentUnwrappedGroup, (...args: any) => any, object], any
>;
/** @internal */
export type CalculateRectByDateIntervalsFn = PureComputed<
  [any, AppointmentMoment[], (...args: any) => any, any], ElementRect[]
>;
