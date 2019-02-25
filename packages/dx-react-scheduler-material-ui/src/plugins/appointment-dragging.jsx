import { withComponents } from '@devexpress/dx-react-core';
import { AppointmentDragging as AppointmentDraggingBase } from '@devexpress/dx-react-scheduler';
import { Container, DraftAppointment, DraggingAppointment } from '../templates/drag-drop';

export const AppointmentDragging = withComponents(
  { DraftAppointment, DraggingAppointment, Container },
)(AppointmentDraggingBase);
