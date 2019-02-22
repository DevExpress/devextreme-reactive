import { withComponents } from '@devexpress/dx-react-core';
import { AppointmentDragging as AppointmentDraggingBase } from '@devexpress/dx-react-scheduler';
import { DraftAppointment, DraggingAppointment } from '../templates/drag-drop';

export const AppointmentDragging = withComponents(
  { DraftAppointment, DraggingAppointment },
)(AppointmentDraggingBase);
