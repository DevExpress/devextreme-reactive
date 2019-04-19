import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../../../utils';

const styles = theme => ({
  cell: {
    paddingBottom: 0,
    borderLeft: getBorder(theme),
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

const CellBase = ({
  classes,
  className,
  startDate,
  endDate,
  today,
  dateFormat,
  ...restProps
}) => {
  // const currentDate = moment(startDate);
  return (
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
        {dateFormat(startDate, { weekday: 'short' })}
      </p>
      <span
        className={classNames({
          [classes.dayOfMonth]: true,
          [classes.highlightCell]: today,
        })}
      >
        {dateFormat(startDate, { day: 'numeric' })}
      </span>
    </TableCell>
  );
};

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
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
