import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { filteredRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'FilteringState' },
];

export class LocalFiltering extends React.PureComponent {
  render() {
    const { filterFn } = this.props;

    const rowsComputed = ({ rows, filters, getCellData }) =>
      filteredRows(rows, filters, getCellData, filterFn);

    return (
      <PluginContainer
        pluginName="LocalFiltering"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
      </PluginContainer>
    );
  }
}

LocalFiltering.propTypes = {
  filterFn: PropTypes.func,
};

LocalFiltering.defaultProps = {
  filterFn: undefined,
};

