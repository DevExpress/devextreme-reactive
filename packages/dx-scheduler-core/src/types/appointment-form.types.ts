import { AppointmentModel, SchedulerTime } from './scheduler-core.types';

/** @internal */
export type Action = ([fieldName]?: any) => void;
/** @internal */
export type StartDate = SchedulerTime;
/** @internal */
export type EndDate = SchedulerTime;
/** @internal */
export type AppointmentDataPayload = {
  appointmentData: AppointmentModel;
};
/** @internal */
export type AddedAppointmentDataPayload = {
  appointmentData: AppointmentModel | {};
};
