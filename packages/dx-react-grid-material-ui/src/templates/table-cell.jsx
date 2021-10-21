import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCellMUI from '@mui/material/TableCell';
import withStyles from '@mui/styles/withStyles';
import { getBorder } from './utils';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    '&:first-child': {
      paddingLeft: theme.spacing(3),
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  footer: {
    borderBottom: getBorder(theme),
  },
  cellRightAlign: {
    textAlign: 'right',
  },
  cellCenterAlign: {
    textAlign: 'center',
  },
  cellNoWrap: {
    whiteSpace: 'nowrap',
  },
});

const TableCellBase = ({
  column, value, children, classes,
  tableRow, tableColumn, row,
  className, forwardedRef,
  ...restProps
}) => (
  <TableCellMUI
    className={classNames({
      [classes.cell]: true,
      [classes.cellRightAlign]: tableColumn && tableColumn.align === 'right',
      [classes.cellCenterAlign]: tableColumn && tableColumn.align === 'center',
      [classes.cellNoWrap]: !(tableColumn && tableColumn.wordWrapEnabled),
    }, className)}
    classes={{ footer: classes.footer }}
    ref={forwardedRef}
    {...restProps}
  >
    {children || value}
  </TableCellMUI>
);

TableCellBase.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  forwardedRef: PropTypes.object,
};

TableCellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  forwardedRef: undefined,
};

export const TableCell = withStyles(styles, { name: 'TableCell' })(TableCellBase);
