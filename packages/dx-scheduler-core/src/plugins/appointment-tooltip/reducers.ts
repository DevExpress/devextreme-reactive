import { PureReducer } from '@devexpress/dx-core';
import { AppointmentMeta } from '../../types';

export const setAppointmentMeta: PureReducer<AppointmentMeta, AppointmentMeta> = (
  prevAppointmentMeta,
  { target, data },
) => ({ target, data });
