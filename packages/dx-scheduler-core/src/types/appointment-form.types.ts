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
