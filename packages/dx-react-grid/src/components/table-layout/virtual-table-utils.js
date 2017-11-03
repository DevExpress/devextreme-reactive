const OVERSCAN = 3;

const STUB_TYPE = 'stub';
const VISIBLE_TYPE = 'visible';
const OVERSCAN_TYPE = 'overscan';

const STARTING_KEY = 'starting';
const ENDING_KEY = 'ending';

export const getVisibleRows = (rows, top, height, getRowHeight) => {
  const result = [];

  const bottom = top + height;
  let position = 0;
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const last = result[result.length - 1];

    const size = getRowHeight(row);
    const nextPosition = position + size;
    if (
      (top <= position && position < bottom && top < nextPosition && nextPosition <= bottom) ||
      (top > position && nextPosition > bottom)
    ) {
      if (last && last.type === STUB_TYPE) {
        rows.slice(Math.max(0, i - OVERSCAN), i).forEach((overscanRow) => {
          const overscanRowSize = getRowHeight(overscanRow);
          last.size -= overscanRowSize;
          result.push({ type: OVERSCAN_TYPE, size: overscanRowSize, row: overscanRow });
        });
      }
      result.push({ type: VISIBLE_TYPE, size, row });
    } else if (last && last.type === STUB_TYPE) {
      last.size += size;
    } else if (i > 0) {
      rows.slice(i, i + OVERSCAN).forEach((overscanRow) => {
        const overscanRowSize = getRowHeight(overscanRow);
        result.push({ type: OVERSCAN_TYPE, size: overscanRowSize, row: overscanRow });
      });
      i += OVERSCAN - 1;
      if (i < rows.length) {
        result.push({ type: STUB_TYPE, key: ENDING_KEY, size: 0 });
      }
    } else {
      result.push({ type: STUB_TYPE, key: STARTING_KEY, size });
    }
    position = nextPosition;
  }

  return result;
};

export const firstVisibleRowOffset = (prevVisibleRows, visibleRows) => {
  const firstVisibleRowIndex = visibleRows.findIndex(row => row.type === VISIBLE_TYPE);
  if (firstVisibleRowIndex === -1) return 0;

  const firstVisibleRow = visibleRows[firstVisibleRowIndex].row;
  const prevIndex = prevVisibleRows.findIndex(row => row.row === firstVisibleRow);
  if (prevIndex === -1) return 0;

  const position = visibleRows
    .slice(0, firstVisibleRowIndex)
    .reduce((acc, row) => acc + row.size, 0);
  const prevPosition = prevVisibleRows
    .slice(0, prevIndex)
    .reduce((acc, row) => acc + row.size, 0);
  return position - prevPosition;
};
