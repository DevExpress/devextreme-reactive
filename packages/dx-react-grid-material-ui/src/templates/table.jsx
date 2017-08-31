import React from 'react';
import PropTypes from 'prop-types';

import {
  Table as TableMUI,
  TableBody as TableBodyMUI,
  TableHead as TableHeadMUI,
  TableRow as TableRowMUI,
} from 'material-ui';

import {
  TableLayout,
} from '@devexpress/dx-react-grid';

const MINIMAL_COLUMN_WIDTH = 120;

/* eslint-disable react/prop-types */
const tableTemplate = ({ children, tableRef, ...restProps }) => (
  <TableMUI ref={tableRef} {...restProps}>{children}</TableMUI>
);
const headTemplate = ({ children, ...restProps }) => (
  <TableHeadMUI {...restProps}>{children}</TableHeadMUI>
);
const bodyTemplate = ({ children, ...restProps }) => (
  <TableBodyMUI {...restProps}>{children}</TableBodyMUI>
);
const rowTemplate = tableRowComponentTemplate => ({ row, children, ...restParams }) => (
  tableRowComponentTemplate && row.type === 'data' ?
    tableRowComponentTemplate({ tableRow: row, children, ...restParams }) :
    <TableRowMUI
      selected={row.selected}
      {...restParams}
    >
      {children}
    </TableRowMUI>
);

export const Table = ({
  headerRows, bodyRows, getRowId,
  columns,
  cellTemplate,
  onClick,
  allowColumnReordering,
  setColumnOrder,
  tableRowComponentTemplate,
}) => (
  <TableLayout
    headerRows={headerRows}
    rows={bodyRows}
    getRowId={getRowId}
    columns={columns}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    tableTemplate={tableTemplate}
    headTemplate={headTemplate}
    bodyTemplate={bodyTemplate}
    rowTemplate={rowTemplate(tableRowComponentTemplate)}
    cellTemplate={cellTemplate}
    onClick={onClick}
    allowColumnReordering={allowColumnReordering}
    setColumnOrder={setColumnOrder}
  />
);

Table.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  tableRowComponentTemplate: PropTypes.func,
  getRowId: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  allowColumnReordering: PropTypes.bool.isRequired,
  setColumnOrder: PropTypes.func.isRequired,
};

Table.defaultProps = {
  onClick: () => {},
  tableRowComponentTemplate: undefined,
};
