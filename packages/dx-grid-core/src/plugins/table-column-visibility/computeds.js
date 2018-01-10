import { TABLE_DATA_TYPE } from './../table/constants';

export const visibleTableColumns = (tableColumns, hiddenColumnNames) =>
  tableColumns.filter((tableColumn) => {
    const isTableColumnVisible = hiddenColumnNames.indexOf(tableColumn.column.name) === -1;
    return tableColumn.type !== TABLE_DATA_TYPE || isTableColumnVisible;
  });
