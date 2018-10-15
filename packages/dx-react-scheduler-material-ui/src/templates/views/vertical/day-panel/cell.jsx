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
    ...theme.typography.display1,
  },
});

const CellBase = ({
  classes,
  className,
  startDate,
  endDate,
  ...restProps
}) => {
  const currentDate = moment(startDate);
  return (
    <TableCell
      className={classNames(classes.cell, className)}
      {...restProps}
    >
      <p className={classes.dayOfWeek}>
        {currentDate.format('ddd')}
      </p>
      <span className={classes.dayOfMonth}>
        {currentDate.format('D')}
      </span>
    </TableCell>
  );
};

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
};

CellBase.defaultProps = {
  className: undefined,
  endDate: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
