import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/styles';
import { HOUR_MINUTE_OPTIONS } from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  cell: {
    border: 0,
    height: theme.spacing(12) + 2,
    padding: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'right',
    '&:last-child': {
      paddingLeft: theme.spacing(0.25),
      paddingRight: theme.spacing(0.5),
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
      {formatDate(endDate, HOUR_MINUTE_OPTIONS)}
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
