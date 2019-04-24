import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../../../utils';

const weekDay = { weekday: 'short' };

const styles = theme => ({
  cell: {
    padding: 0,
    borderLeft: getBorder(theme),
  },
  dayOfWeek: {
    ...theme.typography.caption,
    margin: 0,
    padding: theme.spacing.unit,
  },
});

const CellBase = ({
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
    <div className={classes.dayOfWeek}>
      {formatDate(startDate, weekDay)}
    </div>
  </TableCell>
);

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
