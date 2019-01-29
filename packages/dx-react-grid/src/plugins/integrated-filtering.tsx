import * as React from 'react';
import { Getter, Plugin, Getters } from '@devexpress/dx-react-core';
import {
  filteredRows,
  filteredCollapsedRowsGetter,
  unwrappedFilteredRows,
  getColumnExtension,
  defaultFilterPredicate,
  FilterPredicate,
} from '@devexpress/dx-grid-core';
import { Filter } from './filtering-state';
import { PureComputed } from '@devexpress/dx-core';

// tslint:disable-next-line:no-namespace
export namespace IntegratedFiltering {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /*** A filter predicate. The `filter` parameter accepts an object containing the 'value' field.
     * Note that you can use the onFilter event to extend this object
     * to the fields your filtering algorithm requires. */
    predicate?: (value: any, filter: Filter, row: any) => boolean;
  }
}

export interface IntegratedFilteringProps {
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: IntegratedFiltering.ColumnExtension[];
}

const pluginDependencies = [
  { name: 'FilteringState', optional: true },
  { name: 'SearchState', optional: true },
];

const getCollapsedRowsComputed = ({ rows }: Getters) => filteredCollapsedRowsGetter(rows);
const unwrappedRowsComputed = ({ rows }: Getters) => unwrappedFilteredRows(rows);

export class IntegratedFiltering extends React.PureComponent<IntegratedFilteringProps> {
  static defaultPredicate: (value: any, filter: Filter, row: any) => boolean;

  render() {
    const { columnExtensions } = this.props;
    const getColumnPredicate: PureComputed<
      [string], FilterPredicate
    > = columnName => getColumnExtension(
      columnExtensions, columnName,
    ).predicate!;

    const rowsComputed = ({
      rows,
      filterExpression,
      getCellValue,
      getRowLevelKey,
      getCollapsedRows,
    }: Getters) => filteredRows(
      rows,
      filterExpression,
      getCellValue,
      getColumnPredicate,
      getRowLevelKey,
      getCollapsedRows,
    );

    return (
      <Plugin
        name="IntegratedFiltering"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
        <Getter name="getCollapsedRows" computed={getCollapsedRowsComputed} />
        <Getter name="rows" computed={unwrappedRowsComputed} />
      </Plugin>
    );
  }
}

IntegratedFiltering.defaultPredicate = defaultFilterPredicate;
