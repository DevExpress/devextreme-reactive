import React from 'react';
import PropTypes from 'prop-types';
import {
  TableLayout as TableLayoutCore,
  StaticTableLayout,
} from '@devexpress/dx-react-grid';
import {
  TableBody,
  TableHead,
} from 'material-ui';
import { TableContainer } from './table-container';
import { Table } from './table';

const MINIMAL_COLUMN_WIDTH = 120;

export const TableLayout = ({
  headerRows,
  bodyRows,
  columns,
  cellComponent,
  rowComponent,
}) => (
  <TableLayoutCore
    layoutComponent={StaticTableLayout}
    headerRows={headerRows}
    rows={bodyRows}
    columns={columns}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    containerComponent={TableContainer}
    tableComponent={Table}
    headComponent={TableHead}
    bodyComponent={TableBody}
    rowComponent={rowComponent}
    cellComponent={cellComponent}
  />
);

TableLayout.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
};
