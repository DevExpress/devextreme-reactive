import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCellMUI from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from './utils';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 3,
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  footer: {
    borderBottom: getBorderColor(theme),
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
  className,
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
};

TableCellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};

export const TableCell = withStyles(styles, { name: 'TableCell' })(TableCellBase);
