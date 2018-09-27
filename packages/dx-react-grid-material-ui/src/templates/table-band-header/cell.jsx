import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 3,
    },
    '&:last-child': {
      paddingRight: theme.spacing.unit * 3,
      borderRight: 0,
    },
    height: theme.spacing.unit * 6,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    borderBottom: getBorder(theme),
    borderRight: getBorder(theme),
  },
  leftBorder: {
    borderLeft: getBorder(theme),
  },
});

const CellBase = ({
  column, value, children, classes, tableRow, tableColumn, row, className, leftBorder, ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
      [classes.leftBorder]: leftBorder,
    }, className)}
    {...restProps}
  >
    {children}
  </TableCell>
);

CellBase.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  leftBorder: PropTypes.bool,
};

CellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  leftBorder: false,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
