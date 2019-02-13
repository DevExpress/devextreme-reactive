import { TargetColumnGeometry } from '../index';

/** @internal */
export type CellDimensionsGetter = () => TargetColumnGeometry;
/** @internal */
export type DragOverArgs = { payload: any; clientOffset: { x: any; y: any }; };

/** @internal */
export interface TableReorderingCellProps {
  getCellDimensions: (getter: CellDimensionsGetter) => void;
}

/** @internal */
export interface TableContainerProps {
  onOver: (arg: DragOverArgs) => void;
  onLeave(): void;
  onDrop(): void;
  draggingEnabled: boolean;
}

export interface TableColumnReorderingProps {
  /** The column order. */
  order?: Array<string>;
  /** The initial column order in the uncontrolled mode. */
  defaultOrder?: Array<string>;
  /** Handles changes to the column order. */
  onOrderChange?: (nextOrder: Array<string>) => void;
  /** @internal */
  tableContainerComponent: React.ComponentType<TableContainerProps>;
  /** @internal */
  rowComponent: React.ComponentType<any>;
  /** @internal */
  cellComponent: React.ComponentType<TableReorderingCellProps>;
}

/** @internal */
export type TableColumnReorderingState = {
  order: string[];
  sourceColumnIndex: number;
  targetColumnIndex: number;
};
