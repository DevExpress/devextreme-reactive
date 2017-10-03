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
    const { getGroupValue, getGroupKey } = this.props;

    const groupedGridRowsComputed = ({ gridRows, grouping, getCellValue }) =>
      groupedGridRows(gridRows, grouping, getCellValue, getGroupValue, getGroupKey);

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
  getGroupValue: PropTypes.func,
  getGroupKey: PropTypes.func,
};

LocalGrouping.defaultProps = {
  getGroupValue: undefined,
  getGroupKey: undefined,
};
