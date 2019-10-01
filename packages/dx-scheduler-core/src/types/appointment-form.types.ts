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
export type RadioGroupDisplayData = {
  weekNumber: number;
  dayNumberTextField: number;
  dayOfWeek: number;
  radioGroupValue: string;
};
/** @internal */
export type Option = {
  text: string;
  id: number | string;
};
/** @internal */
export type OptionsFormatterFn = PureComputed<
  [(messageKey: string) => string], Array<Option>
>;
/** @internal */
export type DateFormatterFn = PureComputed<
  [(date: Date, formatOptions: object) => string], Array<Option>
>;
/** @internal */
export type RecurrenceFrequency = number;
