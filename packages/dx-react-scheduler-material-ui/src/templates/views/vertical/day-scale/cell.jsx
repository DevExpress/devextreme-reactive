import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { WEEK_DAY_OPTIONS, DAY_OPTIONS } from '@devexpress/dx-scheduler-core';
import { getBorder } from '../../../utils';

const styles = theme => ({
  cell: {
    userSelect: 'none',
    paddingBottom: 0,
    borderLeft: getBorder(theme),
    '&:last-child': {
      paddingRight: 0,
    },
  },
  dayOfWeek: {
    ...theme.typography.caption,
    margin: 0,
  },
  dayOfMonth: {
    ...theme.typography.h4,
  },
  highlightCell: {
    color: theme.palette.primary.main,
  },
});

const CellBase = React.memo(({
  classes,
  className,
  startDate,
  endDate,
  today,
  formatDate,
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.cell, className)}
    {...restProps}
  >
    <p
      className={classNames({
        [classes.dayOfWeek]: true,
        [classes.highlightCell]: today,
      })}
    >
      {formatDate(startDate, WEEK_DAY_OPTIONS)}
    </p>
    <span
      className={classNames({
        [classes.dayOfMonth]: true,
        [classes.highlightCell]: today,
      })}
    >
      {formatDate(startDate, DAY_OPTIONS)}
    </span>
  </TableCell>
));

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  today: PropTypes.bool,
};

CellBase.defaultProps = {
  className: undefined,
  endDate: undefined,
  today: false,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
