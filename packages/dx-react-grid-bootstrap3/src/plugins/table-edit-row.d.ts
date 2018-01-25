import * as React from 'react';
import {
  TableEditRow as TableEditRowBase,
} from '@devexpress/dx-react-grid';

export namespace TableEditRow {
  export type Cell = React.ComponentType<TableEditRowBase.CellProps>;
  // export const Row: React.ComponentType<TableEditRowBase.RowProps>;
}

export interface TableEditRowProps {
  /** A component that renders an editable cell. */
  cellComponent: React.ComponentType<TableEditRowBase.CellProps>;
  /** A component that renders an editable row. */
  rowComponent: React.ComponentType<TableEditRowBase.RowProps>;
  /** Specifies the editable row's height. */
  rowHeight: number;
}

export declare const TableEditRow: React.ComponentType<TableEditRowProps>;
