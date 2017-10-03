import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { filteredGridRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'FilteringState' },
];

export class LocalFiltering extends React.PureComponent {
  render() {
    const { getColumnPredicate } = this.props;

    const gridRowsComputed = ({ gridRows, filters, getCellValue }) =>
      filteredGridRows(gridRows, filters, getCellValue, getColumnPredicate);

    return (
      <PluginContainer
        pluginName="LocalFiltering"
        dependencies={pluginDependencies}
      >
        <Getter name="gridRows" computed={gridRowsComputed} />
      </PluginContainer>
    );
  }
}

LocalFiltering.propTypes = {
  getColumnPredicate: PropTypes.func,
};

LocalFiltering.defaultProps = {
  getColumnPredicate: undefined,
};

