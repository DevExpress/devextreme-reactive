import { PureReducer } from '@devexpress/dx-core';
import {
  AddedAppointmentDataPayload, AppointmentModel, Changes, EditAppointmentPayload,
} from '../../types';

export const addAppointment: PureReducer<
  AppointmentModel, AddedAppointmentDataPayload, AppointmentModel | {}
> = (
  addedAppointmentData, { appointmentData } = { appointmentData:  {} },
) => appointmentData;

export const cancelAddedAppointment = () => ({});

export const startEditAppointment: PureReducer<
  Partial<AppointmentModel>, EditAppointmentPayload
> = (prevEditingAppointment, appointmentData) => appointmentData;

export const stopEditAppointment = () => null;

export const changeAppointment: PureReducer<
AppointmentModel, Changes
> = (
  appointment, { change },
) => ({ ...appointment, ...change });

export const cancelChanges = () => ({});
