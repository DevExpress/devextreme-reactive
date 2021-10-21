import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  active: {
    backgroundColor: theme.palette.background.default,
  },
});

const TableDetailCellBase = ({
  colSpan, style, children, classes,
  className, forwardedRef,
  tableColumn, tableRow, row,
  ...restProps
}) => (
  <TableCell
    style={style}
    colSpan={colSpan}
    ref={forwardedRef}
    className={classNames(classes.active, className)}
    {...restProps}
  >
    {children}
  </TableCell>
);

TableDetailCellBase.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  forwardedRef: PropTypes.object,
};

TableDetailCellBase.defaultProps = {
  style: null,
  colSpan: 1,
  className: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  children: undefined,
  forwardedRef: undefined,
};

export const TableDetailCell = withStyles(styles, { name: 'TableDetailCell' })(TableDetailCellBase);
