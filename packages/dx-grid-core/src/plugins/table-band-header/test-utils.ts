import { TABLE_DATA_TYPE } from '../table/constants';

/** @internal */
export const generateColumns = (length: number) => (
  Array.from({ length }).map((_, index) => ({
    key: `${index}`,
    column: { name: `${index}` },
    type: TABLE_DATA_TYPE,
  }))
);

/** @internal */
export const generateChains = (
  columnCount: number, compressed: any[],
) => compressed.map((chainBands) => {
  const columns = generateColumns(columnCount);
  const startTitleMap = {};
  const startPoints = new Set([0]);
  const endPoints = new Set([columns.length - 1]);

  Object.keys(chainBands).forEach((title) => {
    const [start, end] = chainBands[title];
    startPoints.add(start);
    endPoints.add(end);
    if (0 < start) {
      endPoints.add(start - 1);
    }
    if (end < columns.length - 1) {
      startPoints.add(end + 1);
    }
    startTitleMap[start] = title;
  });
  const indexes = Array.from(startPoints).concat(Array.from(endPoints))
    .sort((a, b) => a - b)
    .filter(p => p < columns.length);

  const chain: {
    bandTitle: string[],
    columns: typeof columns,
    start: number
  }[] = [];
  for (let i = 0; i < indexes.length - 1; i += 2) {
    const start = indexes[i];
    const end = indexes[i + 1];
    chain.push({
      bandTitle: startTitleMap[start] || null,
      columns: columns.slice(start, end + 1),
      start,
    });
  }

  return chain;
});
