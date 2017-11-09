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

const containerTemplate = props => <TableContainer {...props} />;
const tableTemplate = props => <Table {...props} />;
const headTemplate = props => <TableHead {...props} />;
const bodyTemplate = props => <TableBody {...props} />;

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
