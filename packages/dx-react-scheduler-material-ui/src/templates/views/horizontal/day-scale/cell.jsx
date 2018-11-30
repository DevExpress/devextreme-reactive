import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../../../utils';

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
  dayOfMonth: {
    ...theme.typography.h4,
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
      <div className={classes.dayOfWeek}>
        {currentDate.format('ddd')}
      </div>
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
