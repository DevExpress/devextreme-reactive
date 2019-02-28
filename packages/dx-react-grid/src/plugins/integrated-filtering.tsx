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
import { PureComputed } from '@devexpress/dx-core';
import { IntegratedFilteringProps, DefaultPredicateFn } from '../types';

const pluginDependencies = [
  { name: 'FilteringState', optional: true },
  { name: 'SearchState', optional: true },
];

const getCollapsedRowsComputed = ({ rows }: Getters) => filteredCollapsedRowsGetter(rows);
const unwrappedRowsComputed = ({ rows }: Getters) => unwrappedFilteredRows(rows);

class IntegratedFilteringBase extends React.PureComponent<IntegratedFilteringProps> {
  static defaultPredicate: DefaultPredicateFn;

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

IntegratedFilteringBase.defaultPredicate = defaultFilterPredicate;

export const IntegratedFiltering: React.ComponentType<IntegratedFilteringProps> & {
  /***
   * The built-in filter predicate.
   * The `filter` parameter accepts an object containing the 'value' field.
   **/
  defaultPredicate: DefaultPredicateFn;
} = IntegratedFilteringBase;
