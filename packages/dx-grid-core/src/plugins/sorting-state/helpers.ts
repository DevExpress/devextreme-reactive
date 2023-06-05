import {
  KeepOtherSorting, GetColumnSortingDirectionFn, GetPersistentSortedColumnsFn,
  CalculateKeepOtherFn,
} from '../../types';

const unique = (arr: any[]) => [...Array.from(new Set(arr))];

export const getColumnSortingDirection: GetColumnSortingDirectionFn = (
  sorting, columnName,
) => {
  const columnSorting = sorting.filter(s => s.columnName === columnName)[0];
  return columnSorting ? columnSorting.direction : null;
};

export const getPersistentSortedColumns: GetPersistentSortedColumnsFn = (
  sorting, columnExtensions = [],
) => columnExtensions.reduce((acc, { columnName, sortingEnabled }) => {
  // tslint:disable-next-line:no-boolean-literal-compare
  if (sortingEnabled === false) {
    if (sorting.findIndex(sortItem => sortItem.columnName === columnName) > -1) {
      acc.push(columnName);
    }
  }
  return acc;
}, [] as string[]);

export const calculateKeepOther: CalculateKeepOtherFn = (
  sorting, keepOther, persistentSortedColumns = [],
) => {
  if (!persistentSortedColumns.length) return keepOther as KeepOtherSorting;
  if (!keepOther) return persistentSortedColumns as KeepOtherSorting;

  return Array.isArray(keepOther)
    ? unique([...keepOther, ...persistentSortedColumns])
    : unique([...sorting.map(item => item.columnName), ...persistentSortedColumns]);
};
