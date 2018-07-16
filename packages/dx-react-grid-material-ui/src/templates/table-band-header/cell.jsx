import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    position: 'relative',
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    borderBottom: 'none',
    '&:before': {
      content: '""',
      position: 'absolute',
      background: theme.palette.divider,
      height: 1,
      bottom: 0,
      right: 0,
      left: 0,
    },
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 3,
    },
    '&:last-child': {
      paddingRight: theme.spacing.unit * 3,
      '&:after': {
        content: 'none',
      },
    },
    height: theme.spacing.unit * 6,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:after': {
      content: '""',
      position: 'absolute',
      background: theme.palette.divider,
      width: 1,
      top: 0,
      bottom: 0,
      right: 0,
    },
  },
});

const CellBase = ({
  column, value, children, classes, tableRow, tableColumn, row, className, ...restProps
}) => (
  <TableCell
    className={classNames(classes.cell, className)}
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
};

CellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
