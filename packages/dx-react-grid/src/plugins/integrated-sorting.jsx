import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import { sortedRows, getColumnExtension } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'SortingState' },
];

export class IntegratedSorting extends React.PureComponent {
  render() {
    const { columnExtensions } = this.props;
    const getColumnCompare = columnName => getColumnExtension(columnExtensions, columnName).compare;

    const rowsComputed = ({
      rows, sorting, getCellValue, isGroupRow, getRowLevelKey,
    }) => sortedRows(rows, sorting, getCellValue, getColumnCompare, isGroupRow, getRowLevelKey);

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

IntegratedSorting.propTypes = {
  columnExtensions: PropTypes.array,
};

IntegratedSorting.defaultProps = {
  columnExtensions: undefined,
};
