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
const rowTemplate = tableRowComponentTemplate => ({ children, row, ...restParams }) => (
  tableRowComponentTemplate && row.type === 'data' ?
    tableRowComponentTemplate({ tableRow: row, children, ...restParams }) :
    <tr
      className={row.selected ? 'active' : ''}
      {...restParams}
    >
      {children}
    </tr>
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
    className="table-responsive"
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
Table.defaultProps = {
  onClick: () => {},
  tableRowComponentTemplate: undefined,
};
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
