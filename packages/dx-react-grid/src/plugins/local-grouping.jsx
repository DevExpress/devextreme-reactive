import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { groupedGridRows, expandedGroupGridRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'GroupingState' },
];

const expandedGroupedGridRowsComputed = ({ gridRows, grouping, expandedGroups }) =>
  expandedGroupGridRows(gridRows, grouping, expandedGroups);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalGrouping extends React.PureComponent {
  render() {
    const { getColumnIdentity } = this.props;

    const groupedGridRowsComputed = ({ gridRows, grouping, getCellValue }) =>
      groupedGridRows(gridRows, grouping, getCellValue, getColumnIdentity);

    return (
      <PluginContainer
        pluginName="LocalGrouping"
        dependencies={pluginDependencies}
      >
        <Getter name="gridRows" computed={groupedGridRowsComputed} />
        <Getter name="gridRows" computed={expandedGroupedGridRowsComputed} />
      </PluginContainer>
    );
  }
}

LocalGrouping.propTypes = {
  getColumnIdentity: PropTypes.func,
};

LocalGrouping.defaultProps = {
  getColumnIdentity: undefined,
};
