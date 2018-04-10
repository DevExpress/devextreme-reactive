import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import { getBorderColor } from './../utils';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 3,
      borderLeft: 0,
    },
    '&:last-child': {
      paddingRight: theme.spacing.unit * 3,
      borderRight: 0,
    },
    height: theme.spacing.unit * 6,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    borderBottom: getBorderColor(theme),
    borderLeft: getBorderColor(theme),
    borderRight: getBorderColor(theme),
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
  row: PropTypes.object,
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
