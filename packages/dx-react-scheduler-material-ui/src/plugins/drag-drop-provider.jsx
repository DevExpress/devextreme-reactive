import { withComponents } from '@devexpress/dx-react-core';
import { DragDropProvider as DragDropProviderBase } from '@devexpress/dx-react-scheduler';
import { Container, DraftAppointment, DraggingAppointment } from '../templates/drag-drop';

export const DragDropProvider = withComponents(
  { DraftAppointment, DraggingAppointment, Container },
)(DragDropProviderBase);
