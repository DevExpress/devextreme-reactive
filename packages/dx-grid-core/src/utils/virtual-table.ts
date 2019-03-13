import {
  GetVisibleBoundaryWithFixedFn, VisibleBoundary, GetVisibleBoundaryFn, GetSpanBoundaryFn,
  CollapseBoundariesFn, GetColumnsSizeFn, GetCollapsedColumnsFn, CollapsedColumn,
  GetCollapsedAndStubRowsFn, GetCollapsedCellsFn, GetCollapsedGridFn, GetColumnWidthFn,
  TableColumn, TableRow,
  CollapsedCell,
  GetColumnWidthGetterFn,
  GetRowHeightFn,
} from '../types';
import { TABLE_FLEX_TYPE } from '..';

export const TABLE_STUB_TYPE = Symbol('stub');
import { PureComputed } from '@devexpress/dx-core';
import { intervalUtil } from '../plugins/virtual-table-state/utils';
import { VirtualRows } from '../plugins/virtual-table-state/helpers';

export const getVisibleBoundaryWithFixed: GetVisibleBoundaryWithFixedFn = (
  visibleBoundary, items,
) => items.reduce((acc, item, index) => {
  if (item.fixed && (index < visibleBoundary[0] || index > visibleBoundary[1])) {
    acc.push([index, index]);
  }
  return acc;
}, [visibleBoundary] as [VisibleBoundary]);

type RowsOffsetToPxFn = PureComputed<[number, number, VirtualRows, GetRowHeightFn, number], number>;
export const rowsOffsetToPx: RowsOffsetToPxFn = (
  middleIndex, offsetCount, virtualRows, getRowHeight, estimatedRowHeight,
) => {
  const targetRowIndex = middleIndex + offsetCount;

  const start = Math.min(middleIndex, targetRowIndex);
  const end = Math.max(middleIndex, targetRowIndex);

  const interval = { start, end };
  const rowsStart = virtualRows.start;
  const rowsInterval = { start: rowsStart, end: rowsStart + virtualRows.rows.length };
  const loadedInterval = intervalUtil.intersect(interval, rowsInterval);
  const notLoadedCount = intervalUtil.getLength(interval) - intervalUtil.getLength(loadedInterval);

  let result = 0;
  if (0 !== notLoadedCount) {
    result += notLoadedCount * estimatedRowHeight;
  }
  if (intervalUtil.empty !== loadedInterval) {
    const relativeStart = loadedInterval.start - rowsStart;
    const relativeEnd = loadedInterval.end - rowsStart;

    for (let i = relativeStart; i <= relativeEnd; i += 1) {
      result += getRowHeight(virtualRows.rows[i]);
    }
  }

  return offsetCount > 0 ? result : -result;
};

export const getVisibleBoundary: GetVisibleBoundaryFn = (
  items, viewportStart, viewportSize, getItemSize, offset, itemSize = 0,
) => {
  let start: number | null = null;
  let end: number | null = null;

  const viewportEnd = viewportStart + viewportSize;
  let index = 0;
  let beforePosition = offset * itemSize;
  if (beforePosition + items.length * itemSize < viewportStart) {
    beforePosition = viewportStart;
    index = items.length;
    start = Math.round(viewportStart / itemSize) - offset;
    end = start;// + items.length;
  }

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

  return [start + offset, end + offset];
};

export const getRenderBoundary: GetRenderBoundaryFn = (itemsCount, visibleBoundary, overscan) => {
  let [start, end] = visibleBoundary;
  start = Math.max(0, start - overscan);
  end = Math.min(itemsCount - 1, end + overscan);

  return [start, end];
};

export const getColumnsVisibleBoundary: PureComputed<
  [TableColumn[], number, number, GetColumnWidthFn], VisibleBoundary[]
> = (columns, left, width, getColumnWidth) => (
  getVisibleBoundaryWithFixed(
    getVisibleBoundary(columns, left, width, getColumnWidth, 0),
    columns,
  )
);
export const getRowsVisibleBoundary: PureComputed<
[TableRow[], number, number, GetColumnWidthFn, number, number], VisibleBoundary
> = (rows, top, height, getRowHeight, offset, rowHeight) => {
  return (
    getVisibleBoundary(rows, top, height, getRowHeight, offset, rowHeight)
  );
};

type GetRenderBoundaryFn = PureComputed<[number, number[], number], number[]>;

export const getColumnsRenderBoundary: GetRenderBoundaryFn = (
  columns, visibleBoundary, overscan,
) => (
  getRenderBoundary(columns, visibleBoundary, 1)
);

export const getRowsRenderBoundary: GetRenderBoundaryFn = (
  rowsCount, visibleBoundary, overscan,
) => (
  getRenderBoundary(rowsCount, visibleBoundary, overscan)
);

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
  itemsCount, visibleBoundaries, spanBoundaries, offset = 0,
) => {

  const testboundaries: VisibleBoundary[] = [];
  let min = itemsCount;
  let max = 0;
  visibleBoundaries.reduce((acc: number[], boundary) => {
    for (let point = boundary[0]; point <= boundary[1]; point += 1) {
      acc.push(point);
      if (point < min) {
        min = point;
      }
      if (max < point && point < itemsCount) {
        max = point;
      }
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

  if (min > 0) {
    testboundaries.push([0, min - 1]);
  }

  for (let i = min; i <= max; i += 1) {
    testboundaries.push([i, i]);
  }

  if (max < itemsCount - 1) {
    testboundaries.push([max + 1, itemsCount - 1]);
  }

  return testboundaries;
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
  rows, visibleBoundary, boundaries, getRowHeight, getCells, offset,
) => {
  const collapsedRows: any[] = [];
  boundaries.forEach((boundary) => {
    const isVisible = visibleBoundary[0] <= boundary[0] && boundary[1] <= visibleBoundary[1];
    if (isVisible) {
      const row = rows[boundary[0] - offset];
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
  getColSpan = (row, column) => 1,
  totalRowCount,
  offset,
}) => {
  if (!rows.length || !columns.length) {
    return {
      columns: [],
      rows: [],
    };
  }

  const boundaries = rowsVisibleBoundary || [0, rows.length];

  const rowSpanBoundaries = rows
    .slice(boundaries[0], boundaries[1])
    .map(row => getSpanBoundary(
      columns,
      columnsVisibleBoundary,
      column => getColSpan(row, column),
    ));
  const columnBoundaries = collapseBoundaries(
    columns.length,
    columnsVisibleBoundary,
    rowSpanBoundaries,
    0,
  );

  const rowBoundaries = collapseBoundaries(totalRowCount!, [boundaries], [], offset);

  return {
    columns: getCollapsedColumns(
      columns,
      columnsVisibleBoundary,
      columnBoundaries,
      getColumnWidth,
    ),
    rows: getCollapsedRows(
      rows,
      boundaries,
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
      offset,
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
