import { TABLE_FILTER_TYPE } from './constants';

export const tableHeaderRowsWithFilter = (headerRows, rowHeight) => [
  ...headerRows,
  { key: TABLE_FILTER_TYPE.toString(), type: TABLE_FILTER_TYPE, height: rowHeight }];

export const tableHeaderColumnChainsWithFilter = (
  tableHeaderColumnChains, headerRows, tableColumns,
) => ([
  ...tableHeaderColumnChains,
  ...headerRows
    .filter(row => row.type === TABLE_FILTER_TYPE)
    .map(() => [{
      start: 0,
      columns: tableColumns,
    }]),
]);
