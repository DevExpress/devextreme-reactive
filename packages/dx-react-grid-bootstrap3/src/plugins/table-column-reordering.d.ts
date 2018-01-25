import * as React from 'react';

export interface TableColumnReorderingProps {
  /** The column order. */
  order?: Array<string>;
  /** The initial column order in the uncontrolled mode. */
  defaultOrder?: Array<string>;
  /** Handles changes to the column order. */
  onOrderChange?: (nextOrder: Array<string>) => void;
}

export declare const TableColumnReordering: React.ComponentClass<TableColumnReorderingProps>;
