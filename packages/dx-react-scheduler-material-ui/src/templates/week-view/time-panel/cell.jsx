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
  },
});

const CellBase = ({
  classes,
  className,
  time,
  ...restProps
}) => {
  const currentTime = moment(time);
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
  time: PropTypes.instanceOf(Date).isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

CellBase.defaultProps = {
  className: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
