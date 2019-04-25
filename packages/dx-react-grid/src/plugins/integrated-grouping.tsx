import * as React from 'react';
import { Getter, Plugin, Getters } from '@devexpress/dx-react-core';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupCollapsedRowsGetter,
  groupedRows,
  expandedGroupRows,
  getColumnExtension,
} from '@devexpress/dx-grid-core';
import { IntegratedGroupingProps } from '../types';

const pluginDependencies = [
  { name: 'GroupingState' },
];

const getCollapsedRowsComputed = (
  { getCollapsedRows }: Getters,
) => groupCollapsedRowsGetter(getCollapsedRows);
const expandedGroupedRowsComputed = (
  { rows, grouping, expandedGroups }: Getters,
) => expandedGroupRows(rows, grouping, expandedGroups);

class IntegratedGroupingBase extends React.PureComponent<IntegratedGroupingProps> {
  render() {
    const { columnExtensions } = this.props;
    const getColumnCriteria = columnName => (getColumnExtension(
      columnExtensions, columnName,
    ) as any).criteria;

    const groupedRowsComputed = (
      { rows, grouping, getCellValue }: Getters,
    ) => groupedRows(rows, grouping, getCellValue, getColumnCriteria);

    return (
      <Plugin
        name="IntegratedGrouping"
        dependencies={pluginDependencies}
      >
        <Getter name="isGroupRow" value={groupRowChecker} />
        <Getter name="getRowLevelKey" value={groupRowLevelKeyGetter} />
        <Getter name="getCollapsedRows" computed={getCollapsedRowsComputed} />
        <Getter name="rows" computed={groupedRowsComputed} />
        <Getter name="rows" computed={expandedGroupedRowsComputed} />
      </Plugin>
    );
  }
}

/* tslint:disable: max-line-length */
/** A plugin that performs built-in grouping and group expanding/collapsing. */
export const IntegratedGrouping: React.ComponentType<IntegratedGroupingProps> = IntegratedGroupingBase;
/* tslint:enable: max-line-length */
