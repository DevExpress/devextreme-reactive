import React from 'react';
import PropTypes from 'prop-types';
import {
  TableLayout,
  VirtualTableLayout as VirtualTableLayoutCore,
} from '@devexpress/dx-react-grid';
import { TableContainer } from './table-container';
import { Table } from './table';

const MINIMAL_COLUMN_WIDTH = 120;
const ESTIMATED_ROW_HEIGHT = 37;
const HEIGHT = 530;

const containerTemplate = props => <TableContainer {...props} />;
const headTableTemplate = props => <Table use="head" {...props} />;
const tableTemplate = props => <Table {...props} />;
const headTemplate = props => <thead {...props} />;
const bodyTemplate = props => <tbody {...props} />;

export const VirtualTableLayout = ({
  headerRows,
  bodyRows,
  columns,
  cellTemplate,
  rowTemplate,
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
    estimatedRowHeight={ESTIMATED_ROW_HEIGHT}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    height={HEIGHT}
  />
);

VirtualTableLayout.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
};
