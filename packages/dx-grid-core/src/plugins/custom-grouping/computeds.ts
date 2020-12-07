import { PureComputed } from '@devexpress/dx-core';
import { GRID_GROUP_CHECK } from '../integrated-grouping/constants';
import { GetRowIdFn, Row, RowId, CustomGroupedRowsFn, GroupsGetterFn } from '../../types';
import { getCustomGroups } from './helpers';
import { getGroupRows } from '../integrated-grouping/helpers';

export const customGroupedRows: CustomGroupedRowsFn = (
  rows, grouping, getChildGroups, rootRows = rows,
) => {
  const groupsGetter: GroupsGetterFn = (currentRows, currentGrouping, prefix) =>
    getCustomGroups(
      currentRows,
      currentGrouping,
      prefix,
      getChildGroups,
      rootRows,
    );
  return getGroupRows(rows, grouping, groupsGetter);
};

export const customGroupingRowIdGetter: PureComputed<[GetRowIdFn, Row[]]> = (getRowId, rows) => {
  const firstRow = rows.find(row => !row[GRID_GROUP_CHECK]);
  if (!firstRow || getRowId(firstRow) !== undefined) {
    return getRowId;
  }

  const map = new Map<Row, RowId>(rows
    .filter(row => !row[GRID_GROUP_CHECK])
    .map((row, rowIndex) => [row, rowIndex]) as [Row, RowId]);

  return row => map.get(row)!;
};
