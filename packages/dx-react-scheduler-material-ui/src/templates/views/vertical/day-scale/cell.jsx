import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../../../utils';

const weekDay = { weekday: 'short' };
const day = { day: 'numeric' };

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
      {dateFormat(startDate, weekDay)}
    </p>
    <span
      className={classNames({
        [classes.dayOfMonth]: true,
        [classes.highlightCell]: today,
      })}
    >
      {dateFormat(startDate, day)}
    </span>
  </TableCell>
);

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  today: PropTypes.bool,
  dateFormat: PropTypes.func,
};

CellBase.defaultProps = {
  dateFormat: () => '',
  className: undefined,
  endDate: undefined,
  today: false,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
