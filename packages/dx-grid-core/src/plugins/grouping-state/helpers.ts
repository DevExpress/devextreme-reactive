import { PureComputed } from '@devexpress/dx-core';
import { Grouping, Sorting, GroupIndex } from '../../types';

export const adjustSortIndex: PureComputed<[GroupIndex, Grouping[], Sorting[]]> = (
  groupingIndex, grouping, sorting,
) => Math.max(
  grouping.slice(0, groupingIndex).reduce(
    (acc, columnGrouping) => {
      const columnSortingIndex = sorting.findIndex(
        columnSorting => columnSorting.columnName === columnGrouping.columnName,
      );
      return (columnSortingIndex === -1 ? acc - 1 : acc);
    },
    groupingIndex,
  ),
  0,
);
