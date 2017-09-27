import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { groupedRows, expandedGroupRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'GroupingState' },
];

const expandedGroupedRowsComputed = ({ rows, grouping, expandedGroups }) =>
  expandedGroupRows(rows, grouping, expandedGroups);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalGrouping extends React.PureComponent {
  render() {
    const { getGroupValue, getGroupKey } = this.props;

    const groupedRowsComputed = ({ rows, grouping, getCellValue }) =>
      groupedRows(rows, grouping, getCellValue, getGroupValue, getGroupKey);

    return (
      <PluginContainer
        pluginName="LocalGrouping"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={groupedRowsComputed} />
        <Getter name="rows" computed={expandedGroupedRowsComputed} />
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
