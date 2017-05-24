import React from 'react';
import PropTypes from 'prop-types';

import {
    Table as TableMUI,
    TableBody as TableBodyMUI,
    TableHead as TableHeadMUI,
} from 'material-ui';

import {
  getKeyGetter,
  tableCellClickHandler,
} from '@devexpress/dx-react-grid';

import { TableRow } from './table-row';

const MINIMAL_COLUMN_WIDTH = 120;

export const Table = ({
  headerRows, bodyRows, columns, cellTemplate, onClick, getRowId,
}) => {
  const rowKeyGetter = getKeyGetter(row => (!row.type ? getRowId(row) : row.id));
  const minWidth = columns
    .map(column => column.width || MINIMAL_COLUMN_WIDTH)
    .reduce((accum, minColumnWidth) => accum + minColumnWidth, 0);

  return (
    <div
      style={{
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <TableMUI
        style={{
          minWidth: `${minWidth}px`,
        }}
        onClick={tableCellClickHandler({ headerRows, bodyRows, columns, onClick })}
      >
        <TableHeadMUI>
          {headerRows.map((row, rowIndex) => (
            <TableRow
              key={rowKeyGetter(row, rowIndex)}
              row={row}
              columns={columns}
              cellTemplate={cellTemplate}
            />
          ))}
        </TableHeadMUI>
        <TableBodyMUI>
          {bodyRows.map((row, rowIndex) => (
            <TableRow
              key={rowKeyGetter(row, rowIndex)}
              row={row}
              columns={columns}
              cellTemplate={cellTemplate}
            />
          ))}
        </TableBodyMUI>
      </TableMUI>
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
