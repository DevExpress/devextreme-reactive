import * as React from 'react';
import * as PropTypes from 'prop-types';
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

    return (
      <Plugin
        name="IntegratedFiltering"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
        <Getter
          name="getCollapsedRows"
          computed={({ rows }) => row => rows.collapsedRowsMeta && rows.collapsedRowsMeta.get(row)}
        />
        <Getter name="rows" computed={({ rows }) => rows.rows} />
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

