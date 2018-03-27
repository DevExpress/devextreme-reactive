import { TABLE_BAND_TYPE } from './constants';

export const isBandedTableRow = tableRow => (tableRow.type === TABLE_BAND_TYPE);
export const isBandedOrHeaderRow = tableRow =>
  isBandedTableRow(tableRow) || tableRow.type === 'heading';

export const getColumnMeta = (columnName, columnBands, tableRowLevel) => {
  let currentBandTitle = null;
  let columnLevel = 0;

  const treeProcessing = (bands, level = 0, title) => {
    bands.forEach((column) => {
      if (column.columnName === columnName) {
        columnLevel = level;
        currentBandTitle = title;
      }
      if (column.children !== undefined) {
        treeProcessing(column.children, level + 1, level > tableRowLevel ? title : column.title);
      }
    });
  };

  treeProcessing(columnBands);
  return ({ title: currentBandTitle, level: columnLevel });
};

export const getColSpan =
  (currColumnIndex, tableColumns, columnBands, currentRowLevel, currentColumnTitle) => {
    let colSpan = 1;
    for (let index = currColumnIndex + 1; index < tableColumns.length; index += 1) {
      if (tableColumns[index].type !== 'data') break;
      const columnMeta =
        getColumnMeta(tableColumns[index].column.name, columnBands, currentRowLevel);
      if (columnMeta.title === currentColumnTitle) {
        colSpan += 1;
      } else break;
    }

    return colSpan;
  };

export const getBandComponent = (params, tableHeaderRows, tableColumns, columnBands) => {
  if (params.rowSpan) return { type: 'duplicateRender', payload: null };

  const maxLevel = tableHeaderRows.filter(column => column.type === 'band').length + 1;
  const currentRowLevel = params.tableRow.level === undefined
    ? maxLevel - 1 : params.tableRow.level;
  const currentColumnMeta = params.tableColumn.type === 'data'
    ? getColumnMeta(params.tableColumn.column.name, columnBands, currentRowLevel)
    : { level: 0, title: '' };

  if (currentColumnMeta.level < currentRowLevel) return { type: 'emptyCell', payload: null };
  if (currentColumnMeta.level === currentRowLevel) {
    return {
      type: 'headerCell',
      payload: { tableRow: tableHeaderRows.find(row => row.type === 'heading'), rowSpan: maxLevel - currentRowLevel },
    };
  }

  const currColumnIndex = tableColumns.findIndex(tableColumn =>
    tableColumn.key === params.tableColumn.key);
  if (currColumnIndex > 0 && tableColumns[currColumnIndex - 1].type === 'data') {
    const prevColumnMeta = getColumnMeta(
      tableColumns[currColumnIndex - 1].column.name,
      columnBands,
      currentRowLevel,
    );
    if (prevColumnMeta.title === currentColumnMeta.title) return { type: 'null', payload: null };
  }

  return {
    type: 'groupCell',
    payload: {
      colSpan: getColSpan(
        currColumnIndex,
        tableColumns,
        columnBands,
        currentRowLevel,
        currentColumnMeta.title,
      ),
      value: currentColumnMeta.title,
      column: currentColumnMeta,
    },
  };
};
