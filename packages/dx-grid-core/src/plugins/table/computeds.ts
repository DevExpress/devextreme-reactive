import { PureComputed } from '@devexpress/dx-core';
import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';
import { getColumnExtension } from '../../utils/column-extension';
import { GridColumnExtension, GetCellColSpanFn } from './../../types/table.types';
import { Row, GetRowIdFn } from '../../types';
import { convertWidth } from '../table-column-resizing/helpers';

export const tableColumnsWithDataRows: PureComputed<[any[], GridColumnExtension[]]> = (
  columns, columnExtensions,
) => columns.map((column) => {
  const { name } = column;
  const columnExtension = getColumnExtension(columnExtensions as GridColumnExtension[], name);
  const width = convertWidth(columnExtension.width!);
  return {
    column,
    key: `${TABLE_DATA_TYPE.toString()}_${name}`,
    type: TABLE_DATA_TYPE,
    width,
    align: columnExtension.align,
    wordWrapEnabled: columnExtension.wordWrapEnabled,
  };
});

export const tableRowsWithDataRows: PureComputed<[Row[], GetRowIdFn, number]> = (
  rows, getRowId, isRemoteRowsLoading,
) => (
  !rows.length && !isRemoteRowsLoading
    ? [{ key: TABLE_NODATA_TYPE.toString(), type: TABLE_NODATA_TYPE }]
    : rows.map((row, dataIndex) => {
      const rowId = getRowId(row);
      return {
        row,
        // dataIndex,
        rowId,
        type: TABLE_DATA_TYPE,
        key: `${TABLE_DATA_TYPE.toString()}_${rowId}`,
      };
    }));

export const tableCellColSpanGetter: GetCellColSpanFn = (params) => {
  const { tableRow, tableColumns, tableColumn } = params;
  if (tableRow.type === TABLE_NODATA_TYPE && tableColumns.indexOf(tableColumn) === 0) {
    return tableColumns.length;
  }
  return 1;
};
