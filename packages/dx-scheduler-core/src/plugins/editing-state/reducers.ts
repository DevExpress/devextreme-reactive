import { PureReducer } from '@devexpress/dx-core';
import {
  Index, AddedAppointmentDataPayload, AppointmentModel, Changes, EditAppointmentPayload,
} from '../../types';

export const addAppointment: PureReducer<
  AppointmentModel, AddedAppointmentDataPayload, AppointmentModel | {}
> = (
  addedAppointmentData, { appointmentData } = { appointmentData:  {} },
) => appointmentData;

export const cancelAddedAppointment = () => ({});

export const startEditAppointment: PureReducer<
  Index, EditAppointmentPayload, Index
> = (prevEditingAppointmentId, { appointmentId }) => appointmentId;

export const stopEditAppointment = () => undefined;

export const changeAppointment: PureReducer<
AppointmentModel, Changes, AppointmentModel
> = (
  appointment, { change },
) => ({ ...appointment, ...change });

export const cancelChanges = () => ({});
