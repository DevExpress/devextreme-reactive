import { TABLE_BAND_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';

export const isBandedTableRow = tableRow => (tableRow.type === TABLE_BAND_TYPE);

export const isBandedTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_BAND_TYPE && tableColumn.type === TABLE_DATA_TYPE;

export const getColumnMeta = (columnName, bandColumns, tableRowLevel) => {
  let currentBandTitle = null;
  let columnLevel = 0;

  const treeProcessing = (bands, level = 0, title) => {
    bands.forEach((column) => {
      if (column.columnName === columnName) {
        columnLevel = level;
        currentBandTitle = title;
      }
      if (column.nested !== undefined) {
        treeProcessing(column.nested, level + 1, level > tableRowLevel ? title : column.title);
      }
    });
  };

  treeProcessing(bandColumns);
  return ({ title: currentBandTitle, level: columnLevel });
};
