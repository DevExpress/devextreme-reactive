import React from 'react';
import PropTypes from 'prop-types';

import {
  TableLayout,
} from '@devexpress/dx-react-grid';

const MINIMAL_COLUMN_WIDTH = 120;

/* eslint-disable react/prop-types */
const tableTemplate = ({ children, ...restProps }) => (
  <table
    className="table"
    {...restProps}
  >
    {children}
  </table>
);
const headTemplate = ({ children, ...restProps }) => (
  <thead {...restProps}>{children}</thead>
);
const bodyTemplate = ({ children, ...restProps }) => (
  <tbody {...restProps}>{children}</tbody>
);
const rowTemplate = ({ children, row, ...restProps }) => (
  <tr
    className={row.selected ? 'active' : ''}
    {...restProps}
  >
    {children}
  </tr>
);
/* eslint-enable react/prop-types */

export const Table = ({
  headerRows, bodyRows, getRowId,
  columns,
  cellTemplate,
  onClick,
  allowColumnReordering, setColumnOrder,
}) => (
  <TableLayout
    className="table-responsive"
    headerRows={headerRows}
    rows={bodyRows}
    getRowId={getRowId}
    columns={columns}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    tableTemplate={tableTemplate}
    headTemplate={headTemplate}
    bodyTemplate={bodyTemplate}
    rowTemplate={rowTemplate}
    cellTemplate={cellTemplate}
    onClick={onClick}
    allowColumnReordering={allowColumnReordering}
    setColumnOrder={setColumnOrder}
  />
);
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
  allowColumnReordering: PropTypes.bool.isRequired,
  setColumnOrder: PropTypes.func.isRequired,
};

Table.defaultProps = {
  onClick: () => {},
};
