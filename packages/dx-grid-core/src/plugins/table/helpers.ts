import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';
import {
  IsSpecificCellFn, IsSpecificRowFn, TableRow, TableColumn, CheckColumnExtensionsFn,
} from '../../types';
import { TABLE_STUB_TYPE } from '../../utils/virtual-table';
import { isValidValue } from '../table-column-resizing/helpers';

const VALID_UNITS = ['px', '%', 'em', 'rem', 'vm', 'vh', 'vmin', 'vmax', ''];
const TABLE_ERROR = 'The columnExtension property of the Table plugin is given an invalid value.';

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

export const checkTableColumnExtensions: CheckColumnExtensionsFn = (columnExntesions) => {
  if (columnExntesions) {
    columnExntesions.map((column) => {
      const { width } = column;
      if (typeof width === 'string') {
        if (!isValidValue(width, VALID_UNITS)) {
          throw new Error(TABLE_ERROR);
        }
      }
    });
  }
};
