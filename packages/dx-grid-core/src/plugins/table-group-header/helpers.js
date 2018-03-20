import { TABLE_BAND_TYPE } from './constants';

export const isBandedTableRow = tableRow => (tableRow.type === TABLE_BAND_TYPE);

export const isBandedOrHeaderRow = tableRow =>
  isBandedTableRow(tableRow) || tableRow.type === 'heading';

export const getColumnMeta = (columnName, columnGroups, tableRowLevel) => {
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

  treeProcessing(columnGroups);
  return ({ title: currentBandTitle, level: columnLevel });
};
