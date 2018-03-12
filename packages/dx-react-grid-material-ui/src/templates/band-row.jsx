import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { TableRow as TableRowMUI } from 'material-ui/Table';

const styles = {
  bandRow: {
    height: '48px',
  },
};

export const TableRowBase = ({
  children, classes, className,
  row, tableRow, tableColumn,
  ...restProps
}) => (
  <TableRowMUI
    className={classNames(classes.bandRow, className)}
    {...restProps}
  >
    {children}
  </TableRowMUI>
);

TableRowBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  row: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
};

TableRowBase.defaultProps = {
  children: undefined,
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};

export const BandRow = withStyles(styles, { name: 'BandRow' })(TableRowBase);
