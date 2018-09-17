import { DragDropProvider as DragDropProviderBase, withComponents } from '@devexpress/dx-react-grid';
import { Container, Column } from '../templates/drag-drop';

export const DragDropProvider = withComponents({ Container, Column })(DragDropProviderBase);
