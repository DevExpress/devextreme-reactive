import { AppointmentModel, SchedulerDateTime } from './scheduler-core.types';

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
export type StringWithIdFormat = {
  text: string;
  id: number;
};
