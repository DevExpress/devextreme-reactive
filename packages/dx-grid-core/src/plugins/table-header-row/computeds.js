import { TABLE_HEADING_TYPE } from './constants';

export const tableRowsWithHeading = headerRows => [
  { key: TABLE_HEADING_TYPE.toString(), type: TABLE_HEADING_TYPE },
  ...headerRows];

export const tableHeaderColumnChainsWithHeading = (
  headerColumnChains, tableHeaderRows, tableColumns,
) => [
  ...tableHeaderRows
    .filter(row => row.type === TABLE_HEADING_TYPE)
    .map(() => [{
      start: 0,
      columns: tableColumns,
    }]),

  ...headerColumnChains,
];
