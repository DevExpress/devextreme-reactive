import { AppointmentModel, SchedulerDateTime } from './scheduler-core.types';
import { PureComputed } from '@devexpress/dx-core';

/** @internal */
export type Action = ([fieldName]?: any) => void;
/** @internal */
export type StartDate = SchedulerDateTime;
/** @internal */
export type EndDate = SchedulerDateTime;
/** @internal */
export type AppointmentDataPayload = {
  appointmentData: AppointmentModel;
};
/** @internal */
export type AddedAppointmentDataPayload = {
  appointmentData: AppointmentModel | {};
};
/** @internal */
export type ChangeRecurrenceNumberFeildFn = PureComputed<
  [string, number], string
>;
/** @internal */
export type ChangeRecurrenceEndDateFn = PureComputed<
  [string, SchedulerDateTime], string
>;
/** @internal */
export type ChangeRecurrenceWeekDaysFn = PureComputed<
  [string, [number | 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU']], string
>;
/** @internal */
export type NumberRecurrenceRuleGetterFn = PureComputed<
  [string], number | null |undefined
>;
/** @internal */
export type RecurrenceDateGetterFn = PureComputed<
  [string], SchedulerDateTime | null |undefined
>;
/** @internal */
export type RecurrenceWeekDayGetterFn = PureComputed<
  [string], [number | 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU']
>;
