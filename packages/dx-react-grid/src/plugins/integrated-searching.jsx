import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { searchCells, getColumnExtension } from '@devexpress/dx-grid-core';

const pluginDependencies = [{ pluginName: 'SearchingState' }];

export class IntegratedSearching extends React.PureComponent {
  render() {
    const { columnExtensions } = this.props;
    const getColumnPredicate = columnName =>
      getColumnExtension(columnExtensions, columnName).predicate;

    const rowsComputed = ({
      rows,
      columns,
      getCellValue,
      searchValue,
      isGroupRow,
      getRowLevelKey,
    }) =>
      searchCells(
        rows,
        columns,
        getCellValue,
        searchValue,
        getColumnPredicate,
        isGroupRow,
        getRowLevelKey,
      );

    return (
      <PluginContainer
        pluginName="IntegratedSearching"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
      </PluginContainer>
    );
  }
}

IntegratedSearching.propTypes = {
  columnExtensions: PropTypes.array,
};

IntegratedSearching.defaultProps = {
  columnExtensions: undefined,
};
