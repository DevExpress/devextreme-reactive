import * as React from 'react';
import { Getter, Plugin, Getters } from '@devexpress/dx-react-core';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupCollapsedRowsGetter,
  customGroupingRowIdGetter,
  customGroupedRows,
  expandedGroupRows,
  Grouping,
  GroupKey,
} from '@devexpress/dx-grid-core';

export interface CustomGroupingProps {
  /*** A function that extracts groups from the specified data. It is executed recursively
   * for the root and nested groups.
   **/
  getChildGroups: (currentRows: Array<any>, grouping: Grouping, rootRows: Array<any>) => Array<{ key: number | string, value?: any, childRows?: Array<any> }>;
  /** Specifies columns by which data is grouped. */
  grouping?: Grouping[] | null;
  /** Specifies the expanded groups. */
  expandedGroups?: GroupKey[] | null;
}

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

export class CustomGrouping extends React.PureComponent<CustomGroupingProps> {
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
