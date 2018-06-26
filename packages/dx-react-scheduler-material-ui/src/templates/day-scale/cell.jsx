import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from '../utils';

const styles = theme => ({
  cell: {
    paddingBottom: 0,
    borderLeft: getBorderColor(theme),
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
  children,
  dayOfMonth,
  dayOfWeek,
  ...restProps
}) => (
  <TableCell
    className={classes.cell}
    {...restProps}
  >
    {children || (
      <React.Fragment>
        <p className={classes.dayOfWeek}>
          {dayOfWeek}
        </p>
        <span className={classes.dayOfMonth}>
          {dayOfMonth}
        </span>
      </React.Fragment>
    )}
  </TableCell>
);

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  dayOfMonth: PropTypes.string,
  dayOfWeek: PropTypes.string,
  children: PropTypes.node,
};

CellBase.defaultProps = {
  dayOfMonth: '',
  dayOfWeek: '',
  children: null,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
