import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
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
  className,
  children,
  date,
  ...restProps
}) => {
  const currentDate = moment(date);
  return (
    <TableCell
      className={classNames(classes.cell, className)}
      {...restProps}
    >
      {children || (
        <React.Fragment>
          <p className={classes.dayOfWeek}>
            {currentDate.format('ddd')}
          </p>
          <span className={classes.dayOfMonth}>
            {currentDate.format('D')}
          </span>
        </React.Fragment>
      )}
    </TableCell>
  );
};

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

CellBase.defaultProps = {
  className: undefined,
  children: null,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
