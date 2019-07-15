import { PureReducer } from '@devexpress/dx-core';
import {
  AppointmentId, AddedAppointmentDataPayload, AppointmentModel, Changes, EditAppointmentPayload,
} from '../../types';

export const addAppointment: PureReducer<
  AppointmentModel, AddedAppointmentDataPayload, AppointmentModel | {}
> = (
  addedAppointmentData, { appointmentData } = { appointmentData:  {} },
) => appointmentData;

export const cancelAddedAppointment = () => ({});

export const startEditAppointment: PureReducer<
  AppointmentId, EditAppointmentPayload
> = (prevEditingAppointmentId, appointmentData) => appointmentData;

export const stopEditAppointment = () => undefined;

export const changeAppointment: PureReducer<
AppointmentModel, Changes
> = (
  appointment, { change },
) => ({ ...appointment, ...change });

export const cancelChanges = () => ({});
