import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import { filteredRows, getColumnExtension } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'FilteringState' },
];

export class IntegratedFiltering extends React.PureComponent {
  render() {
    const { columnExtensions } = this.props;
    const getColumnPredicate = columnName =>
      getColumnExtension(columnExtensions, columnName).predicate;

    const rowsComputed = ({
      rows,
      columns,
      filters,
      searchValue,
      getCellValue,
      isGroupRow,
      getRowLevelKey,
    }) => {
      let computedRows = rows;
      if (searchValue) {
        const searchFilters = columns.map(({ name }) => ({
          columnName: name,
          value: searchValue,
        }));
        computedRows = filteredRows(
          rows,
          searchFilters,
          getCellValue,
          getColumnPredicate,
          isGroupRow,
          getRowLevelKey,
          true,
        );
      }

      return filteredRows(
        computedRows,
        filters,
        getCellValue,
        getColumnPredicate,
        isGroupRow,
        getRowLevelKey,
      );
    };

    return (
      <Plugin
        name="IntegratedFiltering"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
      </Plugin>
    );
  }
}

IntegratedFiltering.propTypes = {
  columnExtensions: PropTypes.array,
};

IntegratedFiltering.defaultProps = {
  columnExtensions: undefined,
};
