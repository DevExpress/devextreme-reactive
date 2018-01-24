import * as React from 'react';
import { Column } from '../grid';

export interface DragDropProviderContainerProps {
  /** The current offset of a column that is being dragged. The offset is measured against the application's client area. */
  clientOffset: { x: number, y: number };
  /** A React element or a React element array representing columns being dragged. */
  children: React.ReactNode | Array<React.ReactNode>;
}

export interface DragDropProviderColumnProps {
  /** Specifies a column being dragged. */
  column: Column;
}

export interface DragDropProviderProps {
  /** A component that renders a container for columns being dragged. */
  containerComponent: React.ComponentType<DragDropProviderContainerProps>;
  /** A component that renders a column being dragged. */
  columnComponent: React.ComponentType<DragDropProviderColumnProps>;
}

export declare const DragDropProvider: React.ComponentType<DragDropProviderProps>;
