import * as React from 'react';
import { Getter, Plugin, Getters } from '@devexpress/dx-react-core';
import { sortedRows, getColumnExtension } from '@devexpress/dx-grid-core';

// tslint:disable-next-line: no-namespace
export namespace IntegratedSorting {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /** A sort compare function. See the Sorting guide for more information. */
    compare?: (a: any, b: any) => number;
  }
}

export interface IntegratedSortingProps {
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<IntegratedSorting.ColumnExtension>;
}

const pluginDependencies = [
  { name: 'SortingState' },
];

export class IntegratedSorting extends React.PureComponent<IntegratedSortingProps> {
  render() {
    const { columnExtensions } = this.props;
    const getColumnCompare = columnName => (
      getColumnExtension(columnExtensions, columnName) as IntegratedSorting.ColumnExtension
    ).compare!;

    const rowsComputed = (
      { rows, sorting, getCellValue, isGroupRow, getRowLevelKey }: Getters,
    ) => sortedRows(rows, sorting, getCellValue, getColumnCompare, isGroupRow, getRowLevelKey);

    return (
      <Plugin
        name="IntegratedSorting"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
      </Plugin>
    );
  }
}
