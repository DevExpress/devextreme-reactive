import * as React from 'react';
import { Getter, Plugin, Getters } from '@devexpress/dx-react-core';
import { sortedRows, getColumnExtension } from '@devexpress/dx-grid-core';
import { IntegratedSortingProps, IntegratedSorting as IntegratedSortingNs } from '../types';

const pluginDependencies = [
  { name: 'SortingState' },
];

class IntegratedSortingBase extends React.PureComponent<IntegratedSortingProps> {
  render() {
    const { columnExtensions } = this.props;
    const getColumnCompare = columnName => (
      getColumnExtension(columnExtensions, columnName) as IntegratedSortingNs.ColumnExtension
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

/** A plugin that performs built-in data sorting. */
export const IntegratedSorting: React.ComponentType<IntegratedSortingProps> = IntegratedSortingBase;
