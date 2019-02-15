import {
  GetVisibleBoundaryWithFixedFn, VisibleBoundary, GetVisibleBoundaryFn, GetSpanBoundaryFn,
  CollapseBoundariesFn, GetColumnsSizeFn, GetCollapsedColumnsFn, CollapsedColumn,
  GetCollapsedAndStubRowsFn, GetCollapsedCellsFn, GetCollapsedGridFn, GetColumnWidthFn,
  TableColumn, TableRow,
  CollapsedCell,
  GetColumnWidthGetterFn,
} from '../types';
import { TABLE_FLEX_TYPE } from '..';

export const TABLE_STUB_TYPE = Symbol('stub');
import { PureComputed } from '@devexpress/dx-core';

export const getVisibleBoundaryWithFixed: GetVisibleBoundaryWithFixedFn = (
  visibleBoundary, items,
) => items.reduce((acc, item, index) => {
  if (item.fixed && (index < visibleBoundary[0] || index > visibleBoundary[1])) {
    acc.push([index, index]);
  }
  return acc;
}, [visibleBoundary] as [VisibleBoundary]);

export const getVisibleBoundary: GetVisibleBoundaryFn = (
  items, viewportStart, viewportSize, getItemSize, overscan,
) => {
  let start: number | null = null;
  let end: number | null = null;

  const viewportEnd = viewportStart + viewportSize;
  let index = 0;
  let beforePosition = 0;
  while (end === null && index < items.length) {
    const item = items[index];
    const afterPosition = beforePosition + getItemSize(item)!;
    const isVisible = (beforePosition >= viewportStart && beforePosition < viewportEnd)
      || (afterPosition > viewportStart && afterPosition <= viewportEnd)
      || (beforePosition < viewportStart && afterPosition > viewportEnd);
    if (isVisible && start === null) {
      start = index;
    }
    if (!isVisible && start !== null) {
      end = index - 1;
      break;
    }
    index += 1;
    beforePosition = afterPosition;
  }
  if (start !== null && end === null) {
    end = index - 1;
  }

  start = start === null ? 0 : start;
  end = end === null ? 0 : end;

  if (overscan) {
    start = Math.max(0, start - overscan);
    end = Math.min(items.length - 1, end + overscan);
  }

  return [start, end];
};

export const getColumnsVisibleBoundary: PureComputed<
  [TableColumn[], number, number, GetColumnWidthFn], VisibleBoundary[]
> = (columns, left, width, getColumnWidth) => (
  getVisibleBoundaryWithFixed(
    getVisibleBoundary(columns, left, width, getColumnWidth, 1),
    columns,
  )
);
export const getRowsVisibleBoundary: PureComputed<
[TableRow[], number, number, GetColumnWidthFn], VisibleBoundary
> = (rows, top, height, getRowHeight) => {
  // debugger
  return (
    getVisibleBoundary(rows, top, height, getRowHeight, 3)
  );
};

export const getSpanBoundary: GetSpanBoundaryFn = (
  items, visibleBoundaries, getItemSpan,
) => visibleBoundaries
  .map((visibleBoundary) => {
    let [start, end] = visibleBoundary;
    for (let index = 0; index <= visibleBoundary[1]; index += 1) {
      const span = getItemSpan(items[index]);
      if (index < visibleBoundary[0] && index + span > visibleBoundary[0]) {
        start = index;
      }
      if (index + (span - 1) > visibleBoundary[1]) {
        end = index + (span - 1);
      }
    }
    return [start, end] as VisibleBoundary;
  });

export const collapseBoundaries: CollapseBoundariesFn = (
  itemsCount, visibleBoundaries, spanBoundaries,
) => {
  const boundaries: VisibleBoundary[] = [];

  const visiblePoints = visibleBoundaries.reduce((acc: number[], boundary) => {
    for (let point = boundary[0]; point <= boundary[1]; point += 1) {
      acc.push(point);
    }
    return acc;
  }, []);

  const spanStartPoints = new Set();
  const spanEndPoints = new Set();
  spanBoundaries.forEach(rowBoundaries => rowBoundaries
    .forEach((boundary) => {
      spanStartPoints.add(boundary[0]);
      spanEndPoints.add(boundary[1]);
    }));

  let lastPoint: number | undefined;
  for (let index = 0; index < itemsCount; index += 1) {
    if (visiblePoints.indexOf(index) !== -1) {
      if (lastPoint !== undefined) {
        boundaries.push([lastPoint, index - 1]);
        lastPoint = undefined;
      }
      boundaries.push([index, index]);
    } else if (spanStartPoints.has(index)) {
      if (index > 0) {
        boundaries.push([
          lastPoint !== undefined ? lastPoint : index,
          index - 1,
        ]);
      }
      lastPoint = index;
    } else if (spanEndPoints.has(index)) {
      boundaries.push([
        lastPoint !== undefined ? lastPoint : index,
        index,
      ]);
      lastPoint = undefined;
    } else if (lastPoint === undefined) {
      lastPoint = index;
    }
  }

  if (lastPoint !== undefined) {
    boundaries.push([lastPoint, itemsCount - 1]);
  }

  return boundaries;
};

const getColumnsSize: GetColumnsSizeFn = (columns, startIndex, endIndex, getColumnSize) => {
  let size = 0;
  let index;
  const loopEndIndex = endIndex + 1;
  for (index = startIndex; index < loopEndIndex; index += 1) {
    size += getColumnSize(columns[index], 0) || 0;
  }
  return size;
};

export const getCollapsedColumns: GetCollapsedColumnsFn = (
  columns, visibleBoundaries, boundaries, getColumnWidth,
) => {
  const collapsedColumns: CollapsedColumn[] = [];
  boundaries.forEach((boundary) => {
    const isVisible = visibleBoundaries.reduce((acc, visibleBoundary) => (
      acc || (visibleBoundary[0] <= boundary[0] && boundary[1] <= visibleBoundary[1])
    ), false);

    if (isVisible) {
      const column = columns[boundary[0]];
      collapsedColumns.push({
        ...column,
        width: getColumnWidth(column) as number,
      });
    } else {
      collapsedColumns.push({
        key: `${TABLE_STUB_TYPE.toString()}_${boundary[0]}_${boundary[1]}`,
        type: TABLE_STUB_TYPE,
        width: getColumnsSize(columns, boundary[0], boundary[1], getColumnWidth),
      });
    }
  });
  return collapsedColumns;
};

export const getCollapsedRows: GetCollapsedAndStubRowsFn = (
  rows, visibleBoundary, boundaries, getRowHeight, getCells,
) => {
  const collapsedRows: any[] = [];
  boundaries.forEach((boundary) => {
    const isVisible = visibleBoundary[0] <= boundary[0] && boundary[1] <= visibleBoundary[1];
    if (isVisible) {
      const row = rows[boundary[0]];
      collapsedRows.push({
        row,
        cells: getCells(row),
      });
    } else {
      collapsedRows.push({
        row: {
          key: `${TABLE_STUB_TYPE.toString()}_${boundary[0]}_${boundary[1]}`,
          type: TABLE_STUB_TYPE,
          height: getColumnsSize(rows, boundary[0], boundary[1], getRowHeight),
        },
      });
    }
  });
  return collapsedRows;
};

export const getCollapsedCells: GetCollapsedCellsFn = (
  columns, spanBoundaries, boundaries, getColSpan,
) => {
  const collapsedCells: CollapsedCell[] = [];
  let index = 0;
  while (index < boundaries.length) {
    const boundary = boundaries[index];
    const isSpan = spanBoundaries.reduce((acc, spanBoundary) => (
      acc || (spanBoundary[0] <= boundary[0] && boundary[1] <= spanBoundary[1])), false);
    if (isSpan) {
      const column = columns[boundary[0]];
      const realColSpan = getColSpan(column);
      const realColSpanEnd = (realColSpan + boundary[0]) - 1;
      const colSpanEnd = boundaries.findIndex(
        colSpanBoundary => colSpanBoundary[0]
        <= realColSpanEnd && realColSpanEnd
        <= colSpanBoundary[1],
      );
      collapsedCells.push({
        column,
        colSpan: (colSpanEnd - index) + 1,
      });
      index += 1;
    } else {
      collapsedCells.push({
        column: {
          key: `${TABLE_STUB_TYPE.toString()}_${boundary[0]}_${boundary[1]}`,
          type: TABLE_STUB_TYPE,
        },
        colSpan: 1,
      });
      index += 1;
    }
  }
  return collapsedCells;
};

export const getCollapsedGrid: GetCollapsedGridFn = ({
  rows,
  columns,
  rowsVisibleBoundary,
  columnsVisibleBoundary,
  getColumnWidth = (column: any) => column.width,
  getRowHeight = (row: any) => row.height,
  getColSpan = () => 1,
}) => {
  if (!rows.length || !columns.length) {
    return {
      columns: [],
      rows: [],
    };
  }
// console.log(columnsVisibleBoundary, rowsVisibleBoundary)
  const rowSpanBoundaries = rows
    .slice(rowsVisibleBoundary[0], rowsVisibleBoundary[1])
    .map(row => getSpanBoundary(
      columns,
      columnsVisibleBoundary,
      column => getColSpan(row, column),
    ));
  const columnBoundaries = collapseBoundaries(
    columns.length,
    columnsVisibleBoundary,
    rowSpanBoundaries,
  );

  const rowBoundaries = collapseBoundaries(rows.length, [rowsVisibleBoundary], []);

  return {
    columns: getCollapsedColumns(
      columns,
      columnsVisibleBoundary,
      columnBoundaries,
      getColumnWidth,
    ),
    rows: getCollapsedRows(
      rows,
      rowsVisibleBoundary,
      rowBoundaries,
      getRowHeight,
      row => getCollapsedCells(
        columns,
        getSpanBoundary(
          columns,
          columnsVisibleBoundary,
          column => getColSpan(row, column),
        ),
        columnBoundaries,
        column => getColSpan(row, column),
      ),
    ),
  };
};

export const getColumnWidthGetter: GetColumnWidthGetterFn = (
  tableColumns, tableWidth, minColumnWidth,
) => {
  const colsHavingWidth = tableColumns.filter(col => col.width !== undefined);
  const columnsWidth = colsHavingWidth.reduce((acc, col) => (acc + col.width!), 0);
  const autoWidth = (tableWidth - columnsWidth) / (tableColumns.length - colsHavingWidth.length);
  const autoColWidth = Math.max(autoWidth, minColumnWidth!);

  return column => (column.type === TABLE_FLEX_TYPE
    ? null
    : column.width || autoColWidth);
};
