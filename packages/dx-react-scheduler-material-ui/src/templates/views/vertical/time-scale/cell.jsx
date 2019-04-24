import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const hourMinute = { hour: 'numeric', minute: 'numeric' };

const styles = theme => ({
  cell: {
    border: 0,
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit / 4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'right',
    '&:last-child': {
      padding: theme.spacing.unit,
      paddingLeft: theme.spacing.unit / 4,
    },
  },
  text: {
    ...theme.typography.caption,
    whiteSpace: 'nowrap',
  },
});

const CellBase = ({
  classes,
  className,
  startDate,
  endDate,
  formatDate,
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.cell, className)}
    {...restProps}
  >
    <span className={classes.text}>
      {formatDate(endDate, hourMinute)}
    </span>
  </TableCell>
);

CellBase.propTypes = {
  formatDate: PropTypes.func.isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  startDate: PropTypes.instanceOf(Date),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

CellBase.defaultProps = {
  className: undefined,
  startDate: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
