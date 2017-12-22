import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { sortedRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SortingState' },
];

export class IntegratedSorting extends React.PureComponent {
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
        pluginName="IntegratedSorting"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
      </PluginContainer>
    );
  }
}

IntegratedSorting.propTypes = {
  getColumnCompare: PropTypes.func,
};

IntegratedSorting.defaultProps = {
  getColumnCompare: undefined,
};
