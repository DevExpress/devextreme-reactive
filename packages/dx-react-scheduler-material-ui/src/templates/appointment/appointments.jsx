import * as React from 'react';
import { AppointmentWrapper } from './appointment-wrapper';
import { VerticalAppointment as VerticalBase } from './vertical-appointment';
import { HorizontalAppointment as HorizontalBase } from './horizontal-appointment';

export const VerticalAppointment = props => (
  <AppointmentWrapper
    appointmentComponent={VerticalBase}
    {...props}
  />
);

export const HorizontalAppointment = props => (
  <AppointmentWrapper
    appointmentComponent={HorizontalBase}
    {...props}
  />
);
