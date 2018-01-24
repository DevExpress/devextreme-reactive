import * as React from 'react';
import {
  TableHeaderCellProps,
  TableRowProps,
} from '@devexpress/dx-react-grid';

interface TableHeaderRowProps {
  /** A component that renders a header cell. */
  cellComponent?: React.ComponentType<TableHeaderCellProps>;
  /** A component that renders a header row. */
  rowComponent?: React.ComponentType<TableRowProps>;
  /** Specifies whether to render controls that toggle the column's sorting state. Requires the SortingState dependency. */
  showSortingControls?: boolean;
  /** Specifies whether to display a button that groups data by column. Requires the GroupingState dependency. */
  showGroupingControls?: boolean;
  /** An object that specifies [localization messages]. */
  messages?: object;
}

interface TableHeaderRowComponentType extends React.ComponentClass<TableHeaderRowProps> {
  /** A component that renders a header row. */
  Row: TableRowProps;
  /** A component that renders a header cell. */
  Cell: TableHeaderCellProps;
}

export declare const TableHeaderRow: TableHeaderRowComponentType;
