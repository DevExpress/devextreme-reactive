import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';
import {
  IsSpecificCellFn, IsSpecificRowFn, TableRow, TableColumn, WidthConverterFn,
} from '../../types';
import { TABLE_STUB_TYPE } from '../../utils/virtual-table';

const VALID_UNITS = ['auto', 'px', '%', 'em', 'rem', 'vm', 'vh', 'vmin', 'vmax', ''];
const INVALID_TYPE = [
  'The "$1" column\'s width specified like invalid type.',
  'Check your width type for this column.',
].join('\n');

export const isDataTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_DATA_TYPE && tableColumn.type === TABLE_DATA_TYPE;
export const isHeaderStubTableCell: IsSpecificCellFn<TableRow, TableRow[]> = (
  tableRow, headerRows,
) => headerRows.indexOf(tableRow) > -1;
export const isDataTableRow: IsSpecificRowFn = tableRow => tableRow.type === TABLE_DATA_TYPE;
export const isNoDataTableRow: IsSpecificRowFn = tableRow => tableRow.type === TABLE_NODATA_TYPE;
export const isNoDataTableCell: IsSpecificCellFn<TableColumn, TableColumn[]> = (
  tableColumn, tableColumns,
) => tableColumns.indexOf(tableColumn as any) === 0;
export const isStubTableCell: IsSpecificRowFn = tableRow => (
  tableRow.type === TABLE_STUB_TYPE
);

export const convertWidth: WidthConverterFn = (name, width) => {
  if (typeof width === 'string') {
    const numb = parseInt(width, 10);
    const unit = numb ? width.substr(numb.toString().length) : width;
    if (VALID_UNITS.findIndex(validUnit => validUnit === unit) < 0) {
      throw new Error(INVALID_TYPE.replace('$1', name));
    }
    if (unit === 'px' || unit === '') {
      return numb;
    }
    return width;
  }
  return width;
};
