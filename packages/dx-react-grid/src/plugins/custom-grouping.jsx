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
    const {
      getChildGroups,
      grouping: appliedGrouping,
      expandedGroups: appliedExpandedGroups,
    } = this.props;
    const groupedRowsComputed = ({ rows, grouping }) =>
      customGroupedRows(rows, grouping, getChildGroups);

    return (
      <PluginContainer
        pluginName="CustomGrouping"
        dependencies={pluginDependencies}
      >
        {appliedGrouping && (
          <Getter name="grouping" value={appliedGrouping} />
        )}
        {appliedExpandedGroups && (
          <Getter name="expandedGroups" value={appliedExpandedGroups} />
        )}
        <Getter name="isGroupRow" value={groupRowChecker} />
        <Getter name="getRowLevelKey" value={groupRowLevelKeyGetter} />
        <Getter name="rows" computed={groupedRowsComputed} />
        <Getter name="getRowId" computed={getRowIdComputed} />
        <Getter name="rows" computed={expandedGroupedRowsComputed} />
      </PluginContainer>
    );
  }
}

CustomGrouping.propTypes = {
  getChildGroups: PropTypes.func.isRequired,
  grouping: PropTypes.array,
  expandedGroups: PropTypes.array,
};

CustomGrouping.defaultProps = {
  grouping: undefined,
  expandedGroups: undefined,
};
