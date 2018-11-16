import { TABLE_HEADING_TYPE } from './constants';

export const tableRowsWithHeading = headerRows => [
  { key: TABLE_HEADING_TYPE.toString(), type: TABLE_HEADING_TYPE },
  ...headerRows];

export const tableHeaderColumnChains = (tableHeaderRows, tableColumns) => tableHeaderRows
  .map(() => [{
    start: 0,
    columns: tableColumns,
  }]);
