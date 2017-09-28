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
    style={{
      ...restProps.style,
      overflow: 'hidden',
    }}
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

export const Table = ({
  headerRows,
  bodyRows,
  columns,
  cellTemplate,
  rowTemplate,
  allowColumnReordering,
  setColumnOrder,
}) => (
  <TableLayout
    className="table-responsive"
    headerRows={headerRows}
    rows={bodyRows}
    columns={columns}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    tableTemplate={tableTemplate}
    headTemplate={headTemplate}
    bodyTemplate={bodyTemplate}
    rowTemplate={rowTemplate}
    cellTemplate={cellTemplate}
    allowColumnReordering={allowColumnReordering}
    setColumnOrder={setColumnOrder}
  />
);

Table.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
  allowColumnReordering: PropTypes.bool.isRequired,
  setColumnOrder: PropTypes.func,
};

Table.defaultProps = {
  setColumnOrder: () => {},
};
