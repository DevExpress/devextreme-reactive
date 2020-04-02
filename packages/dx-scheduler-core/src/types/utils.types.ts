import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { AppointmentModel } from './scheduler-core.types';
import { Rect } from './horizontal-rect.types';
import { AppointmentMoment } from './all-day-panel.types';
import { ValidResourceInstance } from '../types';
import { GroupOrientation } from './grouping-state.types';

/** @internal */
export type Interval = [moment.Moment, moment.Moment];
interface GroupItem {
  start: moment.Moment;
  end: moment.Moment;
  dataItem: AppointmentModel;
  offset: number;
  resources?: Array<ValidResourceInstance>;
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
  widthMultipliers?: number[];
  width?: number;
  left?: number;
}

/** @internal */
export interface ElementRect extends Rect {
  dataItem: AppointmentModel;
  type: string;
  fromPrev: boolean;
  toNext: boolean;
  durationType?: 'short' | 'middle' | 'long';
  resources?: Array<ValidResourceInstance>;
  offset?: number;
}

/** @internal */
export interface ViewMetaData {
  groupOrientation: GroupOrientation;
  groupedByDate: boolean;
  groupCount: number;
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
export type CalculateRectByDateAndGroupIntervalsFn = PureComputed<
  [any, AppointmentMoment[][], (...args: any) => any, any,
  ViewMetaData], ElementRect[]
>;
