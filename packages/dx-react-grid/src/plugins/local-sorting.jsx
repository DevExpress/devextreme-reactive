import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { sortedRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SortingState' },
];

export class LocalSorting extends React.PureComponent {
  render() {
    const { getColumnCompare } = this.props;
    const rowsComputed = ({
      rows,
      sorting,
      getCellValue,
      isGroupRow,
      getRowLevelKey,
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
  getColumnCompare: PropTypes.func,
};

LocalSorting.defaultProps = {
  getColumnCompare: undefined,
};
