import React from 'react';
import PropTypes from 'prop-types';

import {
  Table as TableMUI,
  TableBody as TableBodyMUI,
  TableHead as TableHeadMUI,
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

export const Table = ({
  headerRows, bodyRows, getRowId,
  columns,
  cellTemplate,
  rowTemplate,
  onClick,
  allowColumnReordering, setColumnOrder,
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
  getRowId: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  allowColumnReordering: PropTypes.bool.isRequired,
  setColumnOrder: PropTypes.func,
};

Table.defaultProps = {
  onClick: () => {},
  setColumnOrder: () => {},
};
