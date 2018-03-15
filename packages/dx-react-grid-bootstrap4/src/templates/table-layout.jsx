import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  TableLayout as TableLayoutCore,
  StaticTableLayout,
} from '@devexpress/dx-react-grid';

const MINIMAL_COLUMN_WIDTH = 120;

export const TableLayout = ({
  headerRows,
  bodyRows,
  columns,
  cellComponent,
  rowComponent,
  tableComponent,
  headComponent,
  bodyComponent,
  containerComponent,
}) => (
  <TableLayoutCore
    layoutComponent={StaticTableLayout}
    headerRows={headerRows}
    rows={bodyRows}
    columns={columns}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    containerComponent={containerComponent}
    tableComponent={tableComponent}
    headComponent={headComponent}
    bodyComponent={bodyComponent}
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
  tableComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func.isRequired,
  bodyComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
};
