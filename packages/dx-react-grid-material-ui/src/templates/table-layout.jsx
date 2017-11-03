import React from 'react';
import PropTypes from 'prop-types';

import {
  Table as TableMUI,
  TableBody as TableBodyMUI,
  TableHead as TableHeadMUI,
} from 'material-ui';

import {
  TableLayout as TableLayoutCore,
  StaticTableLayout,
} from '@devexpress/dx-react-grid';

const MINIMAL_COLUMN_WIDTH = 120;

/* eslint-disable react/prop-types */
const containerTemplate = ({ children, ...restProps }) => (
  <div
    {...restProps}
    style={{
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      ...restProps.style,
    }}
  >
    {children}
  </div>
);
const tableTemplate = ({ children, ...restProps }) => (
  <TableMUI
    {...restProps}
    style={{
      tableLayout: 'fixed',
      ...restProps.style,
    }}
  >
    {children}
  </TableMUI>
);
const headTemplate = ({ children, ...restProps }) => (
  <TableHeadMUI {...restProps}>{children}</TableHeadMUI>
);
const bodyTemplate = ({ children, ...restProps }) => (
  <TableBodyMUI {...restProps}>{children}</TableBodyMUI>
);

export const TableLayout = ({
  headerRows,
  bodyRows,
  columns,
  cellTemplate,
  rowTemplate,
}) => (
  <TableLayoutCore
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

TableLayout.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
};
