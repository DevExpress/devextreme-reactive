import { PureComputed } from '@devexpress/dx-core';
import {
  GetVisibleBoundaryWithFixedFn, VisibleBoundary, GetVisibleBoundaryFn, GetSpanBoundaryFn,
  CollapseBoundariesFn, GetColumnsSizeFn, GetCollapsedColumnsFn, CollapsedColumn,
  GetCollapsedAndStubRowsFn, GetCollapsedCellsFn, GetCollapsedGridFn, GetColumnWidthFn,
  TableColumn,
  CollapsedCell,
  GetColumnWidthGetterFn,
  GetCollapsedGridsFn,
  CollapsedGrid,
  GetSpecificRenderBoundaryFn,
  GetRenderBoundaryFn,
  GetRowsVisibleBoundaryFn,
} from '../types';
import { TABLE_FLEX_TYPE, intervalUtil } from '..';

export const TABLE_STUB_TYPE = Symbol('stub');

export const getVisibleBoundaryWithFixed: GetVisibleBoundaryWithFixedFn = (
  visibleBoundary, items,
) => items.reduce((acc, item, index) => {
  if (item.fixed && (index < visibleBoundary[0] || index > visibleBoundary[1])) {
    acc.push([index, index]);
  }
  return acc;
}, [visibleBoundary] as [VisibleBoundary]);

export const getVisibleBoundary: GetVisibleBoundaryFn = (
  items, viewportStart, viewportSize, getItemSize, offset = 0, itemSize = 0,
) => {
  let start: number | null = null;
  let end: number | null = null;
  let index = 0;
  let beforePosition = offset * itemSize;

  const viewportEnd = viewportStart + viewportSize;
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

export const getColumnBoundaries: PureComputed<
  [TableColumn[], number, number, GetColumnWidthFn], VisibleBoundary[]
> = (columns, left, width, getColumnWidth) => (
  getVisibleBoundaryWithFixed(
    getColumnsRenderBoundary(
      columns.length,
      getVisibleBoundary(columns, left, width, getColumnWidth, 0),
    ),
    columns,
  )
);
export const getRowsVisibleBoundary: GetRowsVisibleBoundaryFn = (
  rows, top, height, getRowHeight, offset, rowHeight, isDataRemote,
) => {
  const beforePosition = offset * rowHeight;
  const noVisibleRowsLoaded = rowHeight > 0 &&
    beforePosition + rows.length * rowHeight < top ||
    top < beforePosition;

  let boundaries;
  if (isDataRemote && noVisibleRowsLoaded) {
    const topIndex = Math.round(top / rowHeight);
    boundaries = [topIndex, topIndex];
  } else {
    boundaries = getVisibleBoundary(rows, top, height, getRowHeight, offset, rowHeight);
  }

  return boundaries;
};

export const getColumnsRenderBoundary: GetSpecificRenderBoundaryFn = (
  columnCount, visibleBoundary,
) => getRenderBoundary(columnCount, visibleBoundary, 1);

export const getRowsRenderBoundary: GetSpecificRenderBoundaryFn = (
  rowsCount, visibleBoundary,
) => getRenderBoundary(rowsCount, visibleBoundary, 3);

export const getSpanBoundary: GetSpanBoundaryFn = (
  items, visibleBoundaries, getItemSpan,
) => visibleBoundaries
  .map((visibleBoundary) => {
    const endIndex = Math.min(visibleBoundary[1], items.length - 1);
    let end = endIndex;
    let start = visibleBoundary[0] <= end ? visibleBoundary[0] : 0;

    for (let index = 0; index <= endIndex; index += 1) {
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
  const breakpoints = new Set([0, itemsCount]);
  spanBoundaries.forEach(rowBoundaries => rowBoundaries
    .forEach((boundary) => {
      breakpoints.add(boundary[0]);
      // next interval starts after span end point
      breakpoints.add(Math.min(boundary[1] + 1, itemsCount));
    }));

  visibleBoundaries
    .filter(boundary => boundary.every(bound => 0 <= bound && bound < itemsCount))
    .forEach((boundary) => {
      for (let point = boundary[0]; point <= boundary[1]; point += 1) {
        breakpoints.add(point);
      }
      if (boundary[1] + 1 < itemsCount) {
        // close last visible point
        breakpoints.add(boundary[1] + 1);
      }
    });

  const bp = [...breakpoints].sort((a, b) => a - b);
  const bounds: any[] = [];
  for (let i = 0; i < bp.length - 1; i += 1) {
    bounds.push([
      bp[i],
      bp[i + 1] - 1,
    ]);
  }

  return bounds;
};

const getColumnsSize: GetColumnsSizeFn = (columns, startIndex, endIndex, getColumnSize) => {
  let size = 0;
  for (let i = startIndex; i <= endIndex; i += 1) {
    size += getColumnSize(columns[i], 0) || 0;
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
      const row = {} as any;
      collapsedRows.push({
        row: {
          key: `${TABLE_STUB_TYPE.toString()}_${boundary[0]}_${boundary[1]}`,
          type: TABLE_STUB_TYPE,
          height: getColumnsSize(rows, boundary[0], boundary[1], getRowHeight),
        },
        cells: getCells(row),
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
  totalRowCount,
  offset,
}) => {
  if (!columns.length) {
    return {
      columns: [],
      rows: [],
    };
  }

  const boundaries = rowsVisibleBoundary || [0, rows.length - 1 || 1];

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
  );

  const rowBoundaries = collapseBoundaries(totalRowCount!, [boundaries], []);

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
  const colsHavingWidth = tableColumns.filter(col => typeof col.width === 'number');
  const columnsWidth = colsHavingWidth.reduce((acc, col) => (acc + (col.width as number)!), 0);
  const autoWidth = (tableWidth - columnsWidth) / (tableColumns.length - colsHavingWidth.length);
  const autoColWidth = Math.max(autoWidth, minColumnWidth!);

  return column => (column.type === TABLE_FLEX_TYPE
    ? null
    : typeof column.width === 'number' ? column.width : autoColWidth);
};

export const getCollapsedGrids: GetCollapsedGridsFn = ({
    headerRows = [],
    bodyRows = [],
    footerRows = [],
    columns,
    loadedRowsStart,
    totalRowCount,
    getCellColSpan,
    viewport,
    getRowHeight,
    getColumnWidth,
  },
) => {
  const getColSpan = (
    tableRow: any, tableColumn: any,
  ) => getCellColSpan!({ tableRow, tableColumn, tableColumns: columns });

  const getCollapsedGridBlock: PureComputed<
    [any[], any[]?, number?, number?], CollapsedGrid
  > = (
    rows, rowsVisibleBoundary, rowCount = rows.length, offset = 0,
  ) => getCollapsedGrid({
    rows,
    columns,
    rowsVisibleBoundary,
    columnsVisibleBoundary: viewport.columns,
    getColumnWidth,
    getRowHeight,
    getColSpan,
    totalRowCount: rowCount,
    offset,
  });

  const headerGrid = getCollapsedGridBlock(
    headerRows, getRenderRowBounds(viewport.headerRows, headerRows.length),
  );
  const bodyGrid = getCollapsedGridBlock(
    bodyRows,
    adjustedRenderRowBounds(
      viewport.rows, bodyRows.length, loadedRowsStart,
    ),
    totalRowCount || 1,
    loadedRowsStart,
  );
  const footerGrid = getCollapsedGridBlock(
    footerRows, getRenderRowBounds(viewport.footerRows, footerRows.length),
  );

  return {
    headerGrid,
    bodyGrid,
    footerGrid,
  };
};

const getRenderRowBounds: PureComputed<[VisibleBoundary, number], number[]> = (
  visibleBounds, rowCount,
) => getRowsRenderBoundary(
  rowCount,
  visibleBounds,
);

const adjustedRenderRowBounds: PureComputed<[VisibleBoundary, number, number], number[]> = (
  visibleBounds, rowCount, loadedRowsStart,
) => {
  const renderRowBoundaries = getRenderRowBounds(
    visibleBounds, loadedRowsStart + rowCount,
  );
  const adjustedInterval = intervalUtil.intersect(
    { start: renderRowBoundaries[0], end: renderRowBoundaries[1] },
    { start: loadedRowsStart, end: loadedRowsStart + rowCount },
  );
  return [adjustedInterval.start, adjustedInterval.end];
};
