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
const tableTemplate = ({ children, ...restProps }) => (
  <TableMUI {...restProps}>{children}</TableMUI>
);
const headTemplate = ({ children, ...restProps }) => (
  <TableHeadMUI {...restProps}>{children}</TableHeadMUI>
);
const bodyTemplate = ({ children, ...restProps }) => (
  <TableBodyMUI {...restProps}>{children}</TableBodyMUI>
);
const rowTemplate = ({ children, row, ...restProps }) => (
  <TableRowMUI
    selected={row.selected}
    {...restProps}
  >
    {children}
  </TableRowMUI>
);
/* eslint-enable react/prop-types */

export const Table = ({
  headerRows, bodyRows, getRowId,
  columns,
  cellTemplate,
  onClick,
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
    rowTemplate={rowTemplate}
    cellTemplate={cellTemplate}
    onClick={onClick}
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
};
