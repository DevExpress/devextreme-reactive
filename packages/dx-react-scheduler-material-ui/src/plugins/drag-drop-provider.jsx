import { withComponents } from '@devexpress/dx-react-core';
import { DragDropProvider as DragDropProviderBase } from '@devexpress/dx-react-scheduler';
import { Container, Column } from '../templates/drag-drop';

export const DragDropProvider = withComponents({ Container, Column })(DragDropProviderBase);
