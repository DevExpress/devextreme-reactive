import React from 'react';
import PropTypes from 'prop-types';
import {
  TableLayout,
  VirtualTableLayout as VirtualTableLayoutCore,
} from '@devexpress/dx-react-grid';
import {
  TableBody,
  TableHead,
} from 'material-ui';
import { TableContainer } from './table-container';
import { Table } from './table';

const MINIMAL_COLUMN_WIDTH = 120;

const containerTemplate = props => <TableContainer {...props} />;
const headTableTemplate = props => <Table use="head" {...props} />;
const tableTemplate = props => <Table {...props} />;
const headTemplate = props => <TableHead {...props} />;
const bodyTemplate = props => <TableBody {...props} />;

export const VirtualTableLayout = ({
  headerRows,
  bodyRows,
  columns,
  cellTemplate,
  rowTemplate,
  height,
  estimatedRowHeight,
}) => (
  <TableLayout
    layoutComponent={VirtualTableLayoutCore}
    headerRows={headerRows}
    rows={bodyRows}
    columns={columns}
    cellTemplate={cellTemplate}
    rowTemplate={rowTemplate}
    bodyTemplate={bodyTemplate}
    headTemplate={headTemplate}
    tableTemplate={tableTemplate}
    headTableTemplate={headTableTemplate}
    containerTemplate={containerTemplate}
    estimatedRowHeight={estimatedRowHeight}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    height={height}
  />
);

VirtualTableLayout.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  estimatedRowHeight: PropTypes.number.isRequired,
};
