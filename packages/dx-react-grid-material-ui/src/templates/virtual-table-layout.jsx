import React from 'react';
import PropTypes from 'prop-types';
import {
  TableLayout,
  VirtualTableLayout as VirtualTableLayoutCore,
} from '@devexpress/dx-react-grid';
import {
  Table as TableMUI,
  TableBody as TableBodyMUI,
  TableHead as TableHeadMUI,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';

const MINIMAL_COLUMN_WIDTH = 120;

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
const HeaderTable = withStyles(styles, { name: 'VirtualTableLayout' })(({ children, classes, ...restProps }) => (
  <TableMUI
    className={classes.headTable}
    {...restProps}
  >
    {children}
  </TableMUI>
));
const headTableTemplate = props => (
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
