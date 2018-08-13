import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../../utils';

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
    ...theme.typography.display1,
  },
});

const CellBase = ({
  classes,
  className,
  date,
  ...restProps
}) => {
  const currentDate = moment(date);
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
  date: PropTypes.instanceOf(Date).isRequired,
  className: PropTypes.string,
};

CellBase.defaultProps = {
  className: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
