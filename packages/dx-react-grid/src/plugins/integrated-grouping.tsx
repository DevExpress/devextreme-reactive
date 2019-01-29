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

// tslint:disable-next-line:no-namespace
export namespace IntegratedGrouping {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    // tslint:disable-next-line:max-line-length
    /** A grouping criterion function. It returns an object with the **key** field by which data is grouped. If you need to group data by a non-primitive value (for example, a date), assign its string representation to the **key** field and the value to the **value** field. */
    criteria?: (value: any) => { key: string | number, value?: any };
  }
}

export interface IntegratedGroupingProps {
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<IntegratedGrouping.ColumnExtension>;
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

export class IntegratedGrouping extends React.PureComponent<IntegratedGroupingProps> {
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
