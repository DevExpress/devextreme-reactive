import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { filteredRows, filteredCollapsedRowsGetter, getColumnExtension } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'FilteringState' },
];

export class IntegratedFiltering extends React.PureComponent {
  render() {
    const { columnExtensions } = this.props;
    const getColumnPredicate = columnName =>
      getColumnExtension(columnExtensions, columnName).predicate;

    const rowsComputed = ({
      rows,
      filters,
      getCellValue,
      getRowLevelKey,
      getCollapsedRows,
    }) =>
      filteredRows(
        rows,
        filters,
        getCellValue,
        getColumnPredicate,
        getRowLevelKey,
        getCollapsedRows,
      );

    const getCollapsedRowsComputed = ({
      getCollapsedRows,
      filters,
      getCellValue,
    }) =>
      filteredCollapsedRowsGetter(
        getCollapsedRows,
        filters,
        getCellValue,
        getColumnPredicate,
      );

    return (
      <PluginContainer
        pluginName="IntegratedFiltering"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
        <Getter name="getCollapsedRows" computed={getCollapsedRowsComputed} />
      </PluginContainer>
    );
  }
}

IntegratedFiltering.propTypes = {
  columnExtensions: PropTypes.array,
};

IntegratedFiltering.defaultProps = {
  columnExtensions: undefined,
};

