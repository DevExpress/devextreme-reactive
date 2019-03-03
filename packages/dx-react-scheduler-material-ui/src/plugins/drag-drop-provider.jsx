import { withComponents } from '@devexpress/dx-react-core';
import { DragDropProvider as DragDropProviderBase } from '@devexpress/dx-react-scheduler';
import { Container, DraftAppointment, SourceAppointment } from '../templates/drag-drop';

export const DragDropProvider = withComponents(
  { DraftAppointment, SourceAppointment, Container },
)(DragDropProviderBase);
