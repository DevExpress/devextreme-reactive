import * as React from 'react';
import {
  DragDropProviderContainerProps,
  DragDropProviderColumnProps,
} from '@devexpress/dx-react-grid';

export interface DragDropProviderProps {
  /** A component that renders a container for columns being dragged. */
  containerComponent: React.ComponentType<DragDropProviderContainerProps>;
  /** A component that renders a column being dragged. */
  columnComponent: React.ComponentType<DragDropProviderColumnProps>;
}

interface DragDropProviderComponentType extends React.ComponentClass<DragDropProviderProps> {
  Container:  React.ComponentType<DragDropProviderContainerProps>;
  Column: React.ComponentType<DragDropProviderColumnProps>;
}

export declare const DragDropProvider: DragDropProviderComponentType;

