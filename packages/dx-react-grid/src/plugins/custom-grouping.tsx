import * as React from 'react';
import { Getter, Plugin, Getters } from '@devexpress/dx-react-core';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupCollapsedRowsGetter,
  customGroupingRowIdGetter,
  customGroupedRows,
  expandedGroupRows,
} from '@devexpress/dx-grid-core';
import { CustomGroupingProps } from '../types';

const pluginDependencies = [
  { name: 'GroupingState' },
];

const getCollapsedRowsComputed = (
  { getCollapsedRows }: Getters,
) => groupCollapsedRowsGetter(getCollapsedRows);
const expandedGroupedRowsComputed = (
  { rows, grouping, expandedGroups }: Getters,
) => expandedGroupRows(rows, grouping, expandedGroups);
const getRowIdComputed = ({ getRowId, rows }: Getters) => customGroupingRowIdGetter(getRowId, rows);

class CustomGroupingBase extends React.PureComponent<CustomGroupingProps> {
  render() {
    const {
      getChildGroups,
      grouping: appliedGrouping,
      expandedGroups: appliedExpandedGroups,
    } = this.props;
    const groupedRowsComputed = (
      { rows, grouping }: Getters,
    ) => customGroupedRows(rows, grouping, getChildGroups);

    return (
      <Plugin
        name="CustomGrouping"
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
        <Getter name="getCollapsedRows" computed={getCollapsedRowsComputed} />
        <Getter name="rows" computed={groupedRowsComputed} />
        <Getter name="getRowId" computed={getRowIdComputed} />
        <Getter name="rows" computed={expandedGroupedRowsComputed} />
      </Plugin>
    );
  }
}

// tslint:disable-next-line: max-line-length
/** A plugin that converts custom formatted grouped data to a supported format and performs local group expanding/collapsing. */
export const CustomGrouping: React.ComponentType<CustomGroupingProps> = CustomGroupingBase;
