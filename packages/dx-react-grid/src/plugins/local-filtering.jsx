import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { filteredRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'FilteringState' },
];

export class LocalFiltering extends React.PureComponent {
  render() {
    const { predicate } = this.props;

    const rowsComputed = ({ gridRows, filters, getCellValue }) =>
      filteredRows(gridRows, filters, getCellValue, predicate);

    return (
      <PluginContainer
        pluginName="LocalFiltering"
        dependencies={pluginDependencies}
      >
        <Getter name="gridRows" computed={rowsComputed} />
      </PluginContainer>
    );
  }
}

LocalFiltering.propTypes = {
  predicate: PropTypes.func,
};

LocalFiltering.defaultProps = {
  predicate: undefined,
};

