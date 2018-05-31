import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import {
  filteredRows,
  filteredCollapsedRowsGetter,
  unwrappedFilteredRows,
  getColumnExtension,
  defaultFilterPredicate,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'FilteringState', optional: true },
  { name: 'SearchState', optional: true },
];

const getCollapsedRowsComputed = ({ rows }) => filteredCollapsedRowsGetter(rows);
const unwrappedRowsComputed = ({ rows }) => unwrappedFilteredRows(rows);

export class IntegratedFiltering extends React.PureComponent {
  render() {
    const { columnExtensions } = this.props;
    const getColumnPredicate = columnName =>
      getColumnExtension(columnExtensions, columnName).predicate;

    const rowsComputed = ({
      rows,
      filterExpression,
      getCellValue,
      getRowLevelKey,
      getCollapsedRows,
    }) =>
      filteredRows(
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

IntegratedFiltering.propTypes = {
  columnExtensions: PropTypes.array,
};

IntegratedFiltering.defaultProps = {
  columnExtensions: undefined,
};
