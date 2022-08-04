import { PureComputed } from '@devexpress/dx-core';
import {
  GetVisibleBoundaryWithFixedFn, VisibleBoundary, GetVisibleBoundaryFn, GetSpanBoundaryFn,
  CollapseBoundariesFn, GetItemSizeFn, GetCollapsedColumnsFn, CollapsedColumn,
  GetCollapsedAndStubRowsFn, GetCollapsedCellsFn, GetCollapsedGridFn, GetColumnWidthFn,
  CalculateRowHeightFn,
  TableColumn,
  CollapsedCell,
  GetColumnWidthGetterFn,
  GetCollapsedGridsFn,
  CollapsedRow,
  GetColSpanFn,
  GetSpecificRenderBoundaryFn,
  GetRenderBoundaryFn,
  GetRowsVisibleBoundaryFn,
  TableRow,
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
  items, viewportStart, viewportSize, getItemSize, skipItems, offset = 0,
) => {
  let start: number | undefined;
  let end: number | undefined;
  let index = items[0] && items[0].rowId >= skipItems[0] ? 0 : skipItems[0];
  const itemSize = getItemSize();
  let beforePosition = offset !== 0 ? (offset - skipItems[0]) * itemSize : 0;

  const viewportEnd = viewportStart + viewportSize;

  while (end === undefined && index < items.length) {
    const item = items[index];
    const afterPosition = beforePosition + getItemSize(item);
    const isVisible = (beforePosition >= viewportStart && beforePosition < viewportEnd)
      || (afterPosition > viewportStart && afterPosition <= viewportEnd)
      || (beforePosition < viewportStart && afterPosition > viewportEnd);
    if (isVisible && start === undefined) {
      start = index;
    }
    if (!isVisible && start !== undefined) {
      end = index - 1;
      break;
    }
    index += 1;
    beforePosition = afterPosition;
  }
  if (start !== undefined && end === undefined) {
    end = index - 1;
  }
  end = end === undefined ? 0 : end;
  start = start === undefined ? 0 : start;

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
      getVisibleBoundary(columns, left, width, getColumnWidth, [0, 0], 0),
    ),
    columns,
  )
);
export const getRowsVisibleBoundary: GetRowsVisibleBoundaryFn = (
  rows, top, height, getRowHeight, skipItems, offset, isDataRemote,
) => {
  const rowHeight = getRowHeight();
  const beforePosition = offset !== 0 ? (offset - skipItems[0]) * rowHeight : 0;
  const noVisibleRowsLoaded = rowHeight > 0 &&
    beforePosition + rows.length * rowHeight < top ||
    top < beforePosition;

  let boundaries;
  if (isDataRemote && noVisibleRowsLoaded) {
    const topIndex = Math.round(top / rowHeight) + skipItems[0];
    boundaries = [topIndex, topIndex];
  } else {
    boundaries = getVisibleBoundary(rows, top, height, getRowHeight, skipItems, offset);
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

const getItemsSize: GetItemSizeFn = (items, startIndex, endIndex, getItemSize) => {
  let size = 0;
  for (let i = startIndex; i <= endIndex; i += 1) {
    size += getItemSize(items[i]);
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
        width: column.type === TABLE_FLEX_TYPE ? undefined : getColumnWidth(column),
      });
    } else {
      collapsedColumns.push({
        key: `${TABLE_STUB_TYPE.toString()}_${boundary[0]}_${boundary[1]}`,
        type: TABLE_STUB_TYPE,
        width: getItemsSize(columns, boundary[0], boundary[1], getColumnWidth),
      });
    }
  });
  return collapsedColumns;
};

export const getCollapsedRows: GetCollapsedAndStubRowsFn = (
  rows, visibleBoundary, boundaries, skipItems, getRowHeight, getCells, offset,
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
          height: calculateRowHeight(rows, skipItems, getRowHeight, boundary[0], boundary[1]),
        },
        cells: getCells(row),
      });
    }
  });
  return collapsedRows;
};

const calculateRowHeight: CalculateRowHeightFn = (
  rows, skipItems, getRowHeight, bound1, bound2,
) => {
  if (bound1 === 0) {
    let end = bound2;
    if (rows.length && bound2 > rows[rows.length - 1].rowId!) {
      end = bound2 - skipItems[1];
    }
    return getItemsSize(rows, skipItems[0], end, getRowHeight);
  }
  return getItemsSize(rows, bound1, bound2 - skipItems[1], getRowHeight);
};

export const getCollapsedCells: GetCollapsedCellsFn = (
  row, columns, spanBoundaries, boundaries, getColSpan,
) => {
  const collapsedCells: CollapsedCell[] = [];
  let index = 0;
  while (index < boundaries.length) {
    const boundary = boundaries[index];
    const isSpan = spanBoundaries.reduce((acc, spanBoundary) => (
      acc || (spanBoundary[0] <= boundary[0] && boundary[1] <= spanBoundary[1])), false);
    if (isSpan) {
      const column = columns[boundary[0]];
      const realColSpan = getColSpan(row, column);
      if (realColSpan + index - 1 !== columns.length) {
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
      } else {
        collapsedCells.push({
          column,
          colSpan: realColSpan,
        });
      }
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

const getVisibleColumnBoundaries: PureComputed<
  [TableRow[], VisibleBoundary, TableColumn[], VisibleBoundary[], GetColSpanFn], VisibleBoundary[]
> = (rows, boundaries, columns, columnsVisibleBoundary, getColSpan) => {
  const rowSpanBoundaries = rows
    .slice(boundaries[0], boundaries[1] + 1)
    .map(row => getSpanBoundaryByRow(row, columns, columnsVisibleBoundary, getColSpan));
  return collapseBoundaries(
    columns.length,
    columnsVisibleBoundary,
    rowSpanBoundaries,
  );
};

export const getCollapsedGrid: GetCollapsedGridFn = ({
  rows,
  columns,
  rowsVisibleBoundary,
  columnsVisibleBoundary,
  getColumnWidth,
  getRowHeight,
  getColSpan,
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
  const columnBoundaries = getVisibleColumnBoundaries(rows, boundaries, columns,
    columnsVisibleBoundary, getColSpan);
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
      [0, 0],
      getRowHeight,
      row => getCollapsedCells(
        row,
        columns,
        getSpanBoundaryByRow(row, columns, columnsVisibleBoundary, getColSpan),
        columnBoundaries,
        getColSpan,
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

  return (column) => {
    if (column) {
      return column.type === TABLE_FLEX_TYPE ? 0 :
        (typeof column.width === 'number' ? column.width : autoColWidth);
    }
    return autoColWidth;
  };
};

const getSpanBoundaryByRow: PureComputed<
  [TableRow, TableColumn[], VisibleBoundary[], GetColSpanFn], VisibleBoundary[]
> = (row, columns, visibleColumns, getColSpan) =>
  getSpanBoundary(columns, visibleColumns, column => getColSpan(row, column));

export const getCollapsedGrids: GetCollapsedGridsFn = ({
  headerRows,
  bodyRows,
  footerRows,
  columns,
  loadedRowsStart,
  totalRowCount,
  getCellColSpan,
  viewport,
  skipItems,
  getRowHeight,
  getColumnWidth,
}) => {
  if (!columns.length) {
    return {
      headerGrid: { columns: [], rows: [] },
      bodyGrid: { columns: [], rows: [] },
      footerGrid: { columns: [], rows: [] },
    };
  }
  const getColSpan: GetColSpanFn =
    (tableRow, tableColumn) => getCellColSpan!({ tableRow, tableColumn, tableColumns: columns });

  const getCollapsedGridRows: PureComputed<
    [TableRow[], number[], VisibleBoundary[], number?, number?], CollapsedRow[]
  > = (rows, rowsBoundary, columnsBoundary, rowCount = rows.length, offset = 0) => {
    return getCollapsedRows(rows, rowsBoundary,
      collapseBoundaries(rowCount, [rowsBoundary], []),
      skipItems,
      getRowHeight,
      row => getCollapsedCells(
        row,
        columns,
        getSpanBoundaryByRow(row, columns, viewport.columns, getColSpan),
        columnsBoundary,
        getColSpan,
      ),
      offset,
    );
  };

  const rowsVisibleBoundary = adjustedRenderRowBounds(viewport.rows, bodyRows.length,
    loadedRowsStart);
  const columnBoundaries = getVisibleColumnBoundaries(bodyRows, rowsVisibleBoundary,
    columns, viewport.columns, getColSpan);
  const commonColumns = getCollapsedColumns(
    columns,
    viewport.columns,
    columnBoundaries,
    getColumnWidth,
  );

  return {
    headerGrid: {
      columns: commonColumns,
      rows: getCollapsedGridRows(
        headerRows, getRowsRenderBoundary(headerRows.length, viewport.headerRows), columnBoundaries,
      ),
    },
    bodyGrid: {
      columns: commonColumns,
      rows: getCollapsedGridRows(
        bodyRows,
        rowsVisibleBoundary,
        columnBoundaries,
        totalRowCount || 1,
        loadedRowsStart,
      ),
    },
    footerGrid: {
      columns: commonColumns,
      rows: getCollapsedGridRows(
        footerRows, getRowsRenderBoundary(footerRows.length, viewport.footerRows), columnBoundaries,
      ),
    },
  };
};

const adjustedRenderRowBounds: PureComputed<[VisibleBoundary, number, number], number[]> = (
  visibleBounds, rowCount, loadedRowsStart,
) => {
  const renderRowBoundaries = getRowsRenderBoundary(
    loadedRowsStart + rowCount, visibleBounds,
  );
  const adjustedInterval = intervalUtil.intersect(
    { start: renderRowBoundaries[0], end: renderRowBoundaries[1] },
    { start: loadedRowsStart, end: loadedRowsStart + rowCount },
  );
  return [adjustedInterval.start, adjustedInterval.end];
};
