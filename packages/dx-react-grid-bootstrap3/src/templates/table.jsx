import React from 'react';
import PropTypes from 'prop-types';
import {
  TableLayout,
  StaticTableLayout,
} from '@devexpress/dx-react-grid';

const MINIMAL_COLUMN_WIDTH = 120;

/* eslint-disable react/prop-types */
const containerTemplate = ({ children, ...restProps }) => (
  <div
    className="table-responsive"
    {...restProps}
  >
    {children}
  </div>
);
const tableTemplate = ({ children, ...restProps }) => (
  <table
    className="table"
    {...restProps}
    style={{
      overflow: 'hidden',
      ...restProps.style,
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
}) => (
  <TableLayout
    layoutComponent={StaticTableLayout}
    headerRows={headerRows}
    rows={bodyRows}
    columns={columns}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    containerTemplate={containerTemplate}
    tableTemplate={tableTemplate}
    headTemplate={headTemplate}
    bodyTemplate={bodyTemplate}
    rowTemplate={rowTemplate}
    cellTemplate={cellTemplate}
  />
);

Table.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
};
