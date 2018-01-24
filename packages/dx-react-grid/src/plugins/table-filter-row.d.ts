import * as React from 'react';
import { Column } from '../grid';
import { Filter } from './filtering-state';
import { TableRowProps } from './table';

export interface TableFilterCellProps {
  /** Filtering options that are applied to a column. */
  filter: Filter;
  /** An event that initiates applying a new filter to a column. */
  onFilter: (filter: Filter) => void;
  /** A column. */
  column: Column;
  /** Returns the filter editor placeholder text. Available in the "@devexpress/dx-react-grid-material-ui" package. */
  getMessage: (messageKey: string) => string;
}

export interface TableFilterRowProps {
  /** A component that renders a filter cell. */
  cellComponent: React.ComponentType<TableFilterCellProps>;
  /** A component that renders a filter row. */
  rowComponent: React.ComponentType<TableRowProps>;
  /** The filter row's height. */
  rowHeight: number;
  /** An object that specifies [localization messages]. */
  messages: object;
}

export declare const TableFilterRow: React.ComponentType<TableFilterRowProps>;
