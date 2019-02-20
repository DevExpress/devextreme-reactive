import { withComponents } from '@devexpress/dx-react-core';
import { DragDropProvider as DragDropProviderBase } from '@devexpress/dx-react-scheduler';
import { Container, Column, DraggingAppointment } from '../templates/drag-drop';

export const DragDropProvider = withComponents({ Container, Column, DraggingAppointment })(DragDropProviderBase);
