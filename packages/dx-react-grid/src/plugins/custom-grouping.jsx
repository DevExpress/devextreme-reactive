import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  customGroupingRowIdGetter,
  customGroupedRows,
  expandedGroupRows,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'GroupingState' },
];

const expandedGroupedRowsComputed = ({ rows, grouping, expandedGroups }) =>
  expandedGroupRows(rows, grouping, expandedGroups);
const getRowIdComputed = ({ getRowId, rows }) =>
  customGroupingRowIdGetter(getRowId, rows);

export class CustomGrouping extends React.PureComponent {
  render() {
    const { getChildGroups, tempGrouping, tempExpandedGroups } = this.props;
    const groupedGridRowsComputed = ({ rows, grouping }) =>
      customGroupedRows(rows, grouping, getChildGroups);

    return (
      <PluginContainer
        pluginName="CustomGrouping"
        dependencies={pluginDependencies}
      >
        {tempGrouping && (
          <Getter name="grouping" value={tempGrouping} />
        )}
        {tempExpandedGroups && (
          <Getter name="expandedGroups" value={new Set(tempExpandedGroups)} />
        )}
        <Getter name="isGroupRow" value={groupRowChecker} />
        <Getter name="getRowLevelKey" value={groupRowLevelKeyGetter} />
        <Getter name="rows" computed={groupedGridRowsComputed} />
        <Getter name="getRowId" computed={getRowIdComputed} />
        <Getter name="rows" computed={expandedGroupedRowsComputed} />
      </PluginContainer>
    );
  }
}

CustomGrouping.propTypes = {
  getChildGroups: PropTypes.func.isRequired,
  tempGrouping: PropTypes.array,
  tempExpandedGroups: PropTypes.array,
};

CustomGrouping.defaultProps = {
  tempGrouping: undefined,
  tempExpandedGroups: undefined,
};
