import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { sortedRows, getColumnExtension } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SortingState' },
];

export class LocalSorting extends React.PureComponent {
  render() {
    const { columnExtensions } = this.props;
    const getColumnCompare = columnName =>
      getColumnExtension(columnExtensions, columnName).compare;

    const rowsComputed = ({
      rows, sorting, getCellValue, isGroupRow, getRowLevelKey,
    }) =>
      sortedRows(rows, sorting, getCellValue, getColumnCompare, isGroupRow, getRowLevelKey);

    return (
      <PluginContainer
        pluginName="LocalSorting"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
      </PluginContainer>
    );
  }
}

LocalSorting.propTypes = {
  columnExtensions: PropTypes.array,
};

LocalSorting.defaultProps = {
  columnExtensions: undefined,
};
