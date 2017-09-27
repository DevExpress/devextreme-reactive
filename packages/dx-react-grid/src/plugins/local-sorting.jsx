import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { sortedRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SortingState' },
];

// eslint-disable-next-line react/prefer-stateless-function
export class LocalSorting extends React.PureComponent {
  render() {
    const { comparer } = this.props;
    const rowsComputed = ({ rows, sorting, getCellValue }) =>
      sortedRows(rows, sorting, getCellValue, comparer);

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
  comparer: PropTypes.func,
};

LocalSorting.defaultProps = {
  comparer: undefined,
};
