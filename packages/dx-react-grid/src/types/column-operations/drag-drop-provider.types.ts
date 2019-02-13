import { Column } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace DragDropProvider {
  /** Describes properties of the component that renders a container for columns being dragged. */
  export interface ContainerProps {
    /** The current offset of a column that is being dragged. The offset is measured against the application's client area. */
    clientOffset: { x: number, y: number };
    /** A React node representing columns being dragged. */
    children: React.ReactNode;
  }
  /** Describes properties of the component that renders a column being dragged. */
  export interface ColumnProps {
    /** Specifies a column being dragged. */
    column: Column;
  }
}

export interface DragDropProviderProps {
  /** A component that renders a container for columns being dragged. */
  containerComponent: React.ComponentType<DragDropProvider.ContainerProps>;
  /** A component that renders a column being dragged. */
  columnComponent: React.ComponentType<DragDropProvider.ColumnProps>;
}

/** @internal */
export type DragDropProviderState = {
  payload: any;
  clientOffset: { x: number, y: number} | null;
};
/* tslint:enable no-namespace max-line-length */
