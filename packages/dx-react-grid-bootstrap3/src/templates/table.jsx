import React from 'react';
import PropTypes from 'prop-types';

import {
  TableLayout,
} from '@devexpress/dx-react-grid';

const MINIMAL_COLUMN_WIDTH = 120;

/* eslint-disable react/prop-types */
const tableTemplate = ({ children, tableRef, ...restProps }) => (
  <table
    className="table"
    ref={tableRef}
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

// eslint-disable-next-line
const rowTemplate = ({ children, row, ...restProps }) => (<tr
  className={row.selected ? 'active' : ''}
  {...restProps}
>
  {children}
</tr>);

export const Table = ({
  headerRows, bodyRows, getRowId,
  columns,
  cellTemplate,
  onClick,
  allowColumnReordering,
  setColumnOrder,
  rowComponentTemplate,
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
    rowTemplate={({ row, ...restParams }) => (
      rowComponentTemplate && row.type === 'data' ?
        rowComponentTemplate({ row, ...restParams }) :
        rowTemplate({ row, ...restParams })
    )}
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
  rowComponentTemplate: PropTypes.func.isRequired,
  getRowId: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  allowColumnReordering: PropTypes.bool.isRequired,
  setColumnOrder: PropTypes.func.isRequired,
};

Table.defaultProps = {
  onClick: () => {},
};
