import { AppointmentModel, SchedulerDateTime } from './scheduler-core.types';
import { PureComputed } from '@devexpress/dx-core';
import { Options } from 'rrule';

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
export type RecurrecnceOptionsGetterFn = PureComputed<
  [string], Partial<Options> | null
>;
/** @internal */
export type RecurrecnceOptionsSetterFn = PureComputed<
  [Partial<Options>], string | undefined
>;
