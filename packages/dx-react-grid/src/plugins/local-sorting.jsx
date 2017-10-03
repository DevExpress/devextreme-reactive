import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { sortedGridRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SortingState' },
];

export class LocalSorting extends React.PureComponent {
  render() {
    const { getColumnCompare } = this.props;
    const gridRowsComputed = ({ gridRows, sorting, getCellValue }) =>
      sortedGridRows(gridRows, sorting, getCellValue, getColumnCompare);

    return (
      <PluginContainer
        pluginName="LocalSorting"
        dependencies={pluginDependencies}
      >
        <Getter name="gridRows" computed={gridRowsComputed} />
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
