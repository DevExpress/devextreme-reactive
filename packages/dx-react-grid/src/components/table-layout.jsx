import React from 'react';
import PropTypes from 'prop-types';

import {
  tableRowKeyGetter,
  tableColumnKeyGetter,
  getTableCellInfo,
  findTableCellTarget,
} from '@devexpress/dx-grid-core';

const getColumnStyle = ({ column }) => ({
  width: column.width !== undefined ? `${column.width}px` : undefined,
});

const getRowStyle = ({ row }) => ({
  height: row.height !== undefined ? `${row.height}px` : undefined,
});

const renderRowCells = ({ row, columns, cellTemplate }) =>
  columns
    .filter((column, columnIndex) => !getTableCellInfo({ row, columns, columnIndex }).skip)
    .map((column, columnIndex) => React.cloneElement(
      cellTemplate({
        row,
        column,
        colspan: getTableCellInfo({ row, columns, columnIndex }).colspan,
        style: getColumnStyle({ column }),
      }),
      { key: tableColumnKeyGetter(column, columnIndex) },
    ));

const renderRows = ({
  rows,
  getRowId,
  columns,
  rowTemplate,
  cellTemplate,
}) =>
  rows
    .map((row, rowIndex) => React.cloneElement(
      rowTemplate({
        row,
        style: getRowStyle({ row }),
        children: renderRowCells({ row, columns, cellTemplate }),
      }),
      { key: tableRowKeyGetter(getRowId, row, rowIndex) },
    ));

const renderRowsBlock = ({
  rows,
  getRowId,
  columns,
  blockTemplate,
  rowTemplate,
  cellTemplate,
  onClick,
}) => blockTemplate({
  onClick: (e) => {
    const { rowIndex, columnIndex } = findTableCellTarget(e);
    if (rowIndex === -1 || columnIndex === -1) return;
    onClick({ e, row: rows[rowIndex], column: columns[columnIndex] });
  },
  children: renderRows({
    rows,
    getRowId,
    columns,
    rowTemplate,
    cellTemplate,
  }),
});

export const TableLayout = ({
  headerRows,
  rows,
  getRowId,
  columns,
  minColumnWidth,
  tableTemplate,
  headTemplate,
  bodyTemplate,
  rowTemplate,
  cellTemplate,
  onClick,
  ...restProps
}) => {
  const minWidth = columns
    .map(column => column.width || minColumnWidth)
    .reduce((accum, width) => accum + width, 0);

  return (
    <div
      {...restProps}
      style={{
        overflow: 'auto',
        ...restProps.style,
      }}
    >
      {
        tableTemplate({
          style: {
            tableLayout: 'fixed',
            minWidth: `${minWidth}px`,
          },
          children: [
            !headerRows.length ? null : React.cloneElement(
              renderRowsBlock({
                rows: headerRows,
                getRowId,
                columns,
                blockTemplate: headTemplate,
                rowTemplate,
                cellTemplate,
                onClick,
              }),
              { key: 'head' },
            ),
            React.cloneElement(
              renderRowsBlock({
                rows,
                getRowId,
                columns,
                blockTemplate: bodyTemplate,
                rowTemplate,
                cellTemplate,
                onClick,
              }),
              { key: 'body' },
            ),
          ],
        })
      }
    </div>
  );
};

TableLayout.propTypes = {
  headerRows: PropTypes.array,
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  minColumnWidth: PropTypes.number,
  tableTemplate: PropTypes.func.isRequired,
  headTemplate: PropTypes.func,
  bodyTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

TableLayout.defaultProps = {
  headerRows: [],
  headTemplate: () => null,
  minColumnWidth: 120,
  onClick: () => {},
};
