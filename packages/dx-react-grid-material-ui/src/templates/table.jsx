import React from 'react';
import PropTypes from 'prop-types';

import {
    Table as TableMUI,
    TableBody as TableBodyMUI,
    TableHead as TableHeadMUI,
} from 'material-ui';

import {
  tableRowKeyGetter,
  tableCellClickHandler,
} from '@devexpress/dx-react-grid';

import { withStyles, createStyleSheet } from 'material-ui/styles';

import { TableRow } from './table-row';

const MINIMAL_COLUMN_WIDTH = 120;

const styleSheet = createStyleSheet('Table', () => ({
  root: {
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  table: {
    tableLayout: 'fixed',
  },
}));

export const TableBase = ({
  headerRows, bodyRows, columns, cellTemplate, onClick, getRowId, classes,
}) => {
  const minWidth = columns
    .map(column => column.width || MINIMAL_COLUMN_WIDTH)
    .reduce((accum, minColumnWidth) => accum + minColumnWidth, 0);

  return (
    <div className={classes.root}>
      <TableMUI
        style={{
          minWidth: `${minWidth}px`,
        }}
        className={classes.table}
        onClick={tableCellClickHandler({ headerRows, bodyRows, columns, onClick })}
      >
        <TableHeadMUI>
          {headerRows.map((row, rowIndex) => (
            <TableRow
              key={tableRowKeyGetter(getRowId, row, rowIndex)}
              row={row}
              columns={columns}
              cellTemplate={cellTemplate}
            />
          ))}
        </TableHeadMUI>
        <TableBodyMUI>
          {bodyRows.map((row, rowIndex) => (
            <TableRow
              key={tableRowKeyGetter(getRowId, row, rowIndex)}
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

TableBase.defaultProps = {
  onClick: () => {},
};

TableBase.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  getRowId: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export const Table = withStyles(styleSheet)(TableBase);
