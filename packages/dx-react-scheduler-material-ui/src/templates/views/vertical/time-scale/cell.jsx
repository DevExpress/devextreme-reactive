import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

const styles = theme => ({
  cell: {
    border: 0,
    padding: theme.spacing.unit,
    '&:last-child': {
      padding: theme.spacing.unit,
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
  ...restProps
}) => {
  const currentTime = moment(endDate);
  return (
    <TableCell
      numeric
      className={classNames(classes.cell, className)}
      {...restProps}
    >
      <span className={classes.text}>
        {currentTime.format('h:mm A')}
      </span>
    </TableCell>
  );
};

CellBase.propTypes = {
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
