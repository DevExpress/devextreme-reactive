import React from 'react';
import PropTypes from 'prop-types';
import {
  TableLayout,
  VirtualTableLayout,
} from '@devexpress/dx-react-grid';
import {
  Table as TableMUI,
  TableBody as TableBodyMUI,
  TableHead as TableHeadMUI,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';

const MINIMAL_COLUMN_WIDTH = 120;
const ESTIMATED_ROW_HEIGHT = 48;
const HEIGHT = 530;

/* eslint-disable react/prop-types */
const styles = {
  headTable: {
    tableLayout: 'fixed',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    background: 'white',
    overflow: 'visible',
    fallbacks: {
      position: '-webkit-sticky',
    },
  },
};
const containerTemplate = ({ children, ...restProps }) => (
  <div
    {...restProps}
    style={{
      ...restProps.style,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}
  >
    {children}
  </div>
);
const HeaderTable = withStyles(styles, { name: 'VirtualTable' })(({ children, classes, ...restProps }) => (
  <TableMUI
    className={classes.headTable}
    {...restProps}
  >
    {children}
  </TableMUI>
));
const tableHeaderTemplate = props => (
  <HeaderTable {...props} />
);
const tableTemplate = ({ children, ...restProps }) => (
  <TableMUI
    {...restProps}
    style={{
      ...restProps.style,
      tableLayout: 'fixed',
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

export const VirtualTable = ({
  headerRows,
  bodyRows,
  columns,
  cellTemplate,
  rowTemplate,
}) => (
  <TableLayout
    layoutComponent={VirtualTableLayout}
    headerRows={headerRows}
    bodyRows={bodyRows}
    columns={columns}
    cellTemplate={cellTemplate}
    rowTemplate={rowTemplate}
    bodyTemplate={bodyTemplate}
    headTemplate={headTemplate}
    tableTemplate={tableTemplate}
    tableHeaderTemplate={tableHeaderTemplate}
    containerTemplate={containerTemplate}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    estimatedRowHeight={ESTIMATED_ROW_HEIGHT}
    height={HEIGHT}
  />
);

VirtualTable.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
};
