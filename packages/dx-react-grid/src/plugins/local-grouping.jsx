import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { groupedRows, expandedGroupRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'GroupingState' },
];

const expandedGroupedRowsComputed = ({ gridRows, grouping, expandedGroups }) =>
  expandedGroupRows(gridRows, grouping, expandedGroups);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalGrouping extends React.PureComponent {
  render() {
    const { getGroupValue, getGroupKey } = this.props;

    const groupedRowsComputed = ({ gridRows, grouping, getCellValue }) =>
      groupedRows(gridRows, grouping, getCellValue, getGroupValue, getGroupKey);

    return (
      <PluginContainer
        pluginName="LocalGrouping"
        dependencies={pluginDependencies}
      >
        <Getter name="gridRows" computed={groupedRowsComputed} />
        <Getter name="gridRows" computed={expandedGroupedRowsComputed} />
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
