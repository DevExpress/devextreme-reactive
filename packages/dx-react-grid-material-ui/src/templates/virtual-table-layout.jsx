import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  TableLayout,
  VirtualTableLayout as VirtualTableLayoutCore,
} from '@devexpress/dx-react-grid';
import { TableContainer } from './table-container';

const MINIMAL_COLUMN_WIDTH = 120;

export const VirtualTableLayout = ({
  headerRows,
  bodyRows,
  columns,
  cellComponent,
  rowComponent,
  height,
  estimatedRowHeight,
  tableComponent, bodyComponent, headComponent, headTableComponent,
}) => (
  <TableLayout
    layoutComponent={VirtualTableLayoutCore}
    headerRows={headerRows}
    rows={bodyRows}
    columns={columns}
    cellComponent={cellComponent}
    rowComponent={rowComponent}
    tableComponent={tableComponent}
    bodyComponent={bodyComponent}
    headComponent={headComponent}
    headTableComponent={headTableComponent}
    containerComponent={TableContainer}
    estimatedRowHeight={estimatedRowHeight}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    height={height}
  />
);

VirtualTableLayout.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  estimatedRowHeight: PropTypes.number.isRequired,
  tableComponent: PropTypes.func.isRequired,
  bodyComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func.isRequired,
  headTableComponent: PropTypes.func.isRequired,
};
