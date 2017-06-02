import React from 'react';
import PropTypes from 'prop-types';

import {
  tableRowKeyGetter,
  tableCellClickHandler,
} from '@devexpress/dx-react-grid';

import { TableRow } from './table-row';

const MINIMAL_COLUMN_WIDTH = 120;

export const Table = ({
  headerRows, bodyRows, columns, cellTemplate, onClick, getRowId,
}) => {
  const minWidth = columns
    .map(column => column.width || MINIMAL_COLUMN_WIDTH)
    .reduce((accum, minColumnWidth) => accum + minColumnWidth, 0);

  return (
    <div
      className="table-responsive"
      style={{
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <table
        className="table"
        style={{
          tableLayout: 'fixed',
          minWidth: `${minWidth}px`,
        }}
        onClick={tableCellClickHandler({ headerRows, bodyRows, columns, onClick })}
      >
        <thead>
          {headerRows.map((row, rowIndex) => (
            <TableRow
              key={tableRowKeyGetter(getRowId, row, rowIndex)}
              row={row}
              columns={columns}
              cellTemplate={cellTemplate}
            />
          ))}
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <TableRow
              key={tableRowKeyGetter(getRowId, row, rowIndex)}
              row={row}
              columns={columns}
              cellTemplate={cellTemplate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
Table.defaultProps = {
  onClick: () => {},
};
Table.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  getRowId: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};
