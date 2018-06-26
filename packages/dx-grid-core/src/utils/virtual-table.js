export const STUB_TYPE = 'stub';
export const VISIBLE_TYPE = 'visible';

export const getVisibleBoundary = (items, viewportStart, viewportSize, getItemSize, overscan) => {
  let start = null;
  let end = null;

  const viewportEnd = viewportStart + viewportSize;
  let index = 0;
  let beforePosition = 0;
  while (end === null && index < items.length) {
    const item = items[index];
    const afterPosition = beforePosition + getItemSize(item);
    const isVisible = (beforePosition >= viewportStart && beforePosition < viewportEnd) ||
      (afterPosition > viewportStart && afterPosition <= viewportEnd) ||
      (beforePosition < viewportStart && afterPosition > viewportEnd);
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

export const getSpanBoundary = (items, visibleBoundary, getItemSpan) => {
  let start = visibleBoundary[0];
  let end = visibleBoundary[1];

  for (let index = 0; index <= visibleBoundary[1]; index += 1) {
    const span = getItemSpan(items[index]);
    if (index < visibleBoundary[0] && index + span > visibleBoundary[0]) {
      start = index;
    }
    if (index + (span - 1) > visibleBoundary[1]) {
      end = index + (span - 1);
    }
  }

  return [start, end];
};

export const collapseBoundaries = (itemsCount, visibleBoundary, spanBoundaries) => {
  const beforePoints = new Set([0, visibleBoundary[0]]);
  const afterPoints = new Set([visibleBoundary[1], itemsCount - 1]);
  spanBoundaries.forEach((boundary) => {
    beforePoints.add(boundary[0]);
    afterPoints.add(boundary[1]);
  });

  const boundaries = [];

  let lastBeforePoint = null;
  Array.from(beforePoints).sort((a, b) => a - b).forEach((point) => {
    if (lastBeforePoint === null) {
      lastBeforePoint = point;
      return;
    }
    boundaries.push([lastBeforePoint, point - 1]);
    lastBeforePoint = point;
  });

  for (let index = visibleBoundary[0]; index <= visibleBoundary[1]; index += 1) {
    boundaries.push([index, index]);
  }

  let lastAfterPoint = null;
  Array.from(afterPoints).sort((a, b) => a - b).forEach((point) => {
    if (lastAfterPoint === null) {
      lastAfterPoint = point;
      return;
    }
    boundaries.push([lastAfterPoint + 1, point]);
    lastAfterPoint = point;
  });

  return boundaries;
};

const getColumnsSize = (columns, startIndex, endIndex, getColumnSize) => {
  let size = 0;
  let index;
  const loopEndIndex = endIndex + 1;
  for (index = startIndex; index < loopEndIndex; index += 1) {
    size += getColumnSize(columns[index], 0);
  }
  return size;
};

export const getCollapsedColumns = (columns, visibleBoundary, boundaries, getColumnWidth) => {
  const collapsedColumns = [];
  boundaries.forEach((boundary) => {
    const isVisible = visibleBoundary[0] <= boundary[0] && boundary[1] <= visibleBoundary[1];
    if (isVisible) {
      const column = columns[boundary[0]];
      collapsedColumns.push(column);
    } else {
      collapsedColumns.push({
        key: `${STUB_TYPE}_${boundary[0]}_${boundary[1]}`,
        type: STUB_TYPE,
        width: getColumnsSize(columns, boundary[0], boundary[1], getColumnWidth),
      });
    }
  });
  return collapsedColumns;
};

export const getCollapsedRows = (rows, visibleBoundary, boundaries, getRowHeight, getCells) => {
  const collapsedColumns = [];
  boundaries.forEach((boundary) => {
    const isVisible = visibleBoundary[0] <= boundary[0] && boundary[1] <= visibleBoundary[1];
    if (isVisible) {
      const row = rows[boundary[0]];
      collapsedColumns.push({
        row,
        cells: getCells(row),
      });
    } else {
      collapsedColumns.push({
        row: {
          type: STUB_TYPE,
          key: `${STUB_TYPE}_${boundary[0]}_${boundary[1]}`,
          height: getColumnsSize(rows, boundary[0], boundary[1], getRowHeight),
        },
      });
    }
  });
  return collapsedColumns;
};

export const getCollapsedCells = (columns, spanBoundary, boundaries, getColSpan) => {
  const collapsedColumns = [];
  let index = 0;
  while (index < boundaries.length) {
    const boundary = boundaries[index];
    const isSpan = spanBoundary[0] <= boundary[0] && boundary[1] <= spanBoundary[1];
    if (isSpan) {
      const column = columns[boundary[0]];
      const realColSpan = getColSpan(column);
      const realColSpanEnd = (realColSpan + boundary[0]) - 1;
      const colSpanEnd = boundaries.findIndex(colSpanBoundary =>
        colSpanBoundary[0] <= realColSpanEnd && realColSpanEnd <= colSpanBoundary[1]);
      collapsedColumns.push({
        column,
        colSpan: (colSpanEnd - index) + 1,
      });
      index += 1;
    } else {
      collapsedColumns.push({
        column: {
          key: `${STUB_TYPE}_${boundary[0]}_${boundary[1]}`,
          type: STUB_TYPE,
        },
        colSpan: 1,
      });
      index += 1;
    }
  }
  return collapsedColumns;
};

export const getCollapsedGrid = ({
  rows,
  columns,
  top,
  height,
  left,
  width,
  getColumnWidth = column => column.width,
  getRowHeight = row => row.height,
  getColSpan = () => 1,
}) => {
  if (!rows.length || !columns.length) {
    return {
      columns: [],
      rows: [],
    };
  }
  const rowsVisibleBoundary = getVisibleBoundary(rows, top, height, getRowHeight, 3);
  const columnsVisibleBoundary = getVisibleBoundary(columns, left, width, getColumnWidth, 1);

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

  const rowBoundaries = collapseBoundaries(rows.length, rowsVisibleBoundary, []);

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
