import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../../utils';

const styles = theme => ({
  cell: {
    borderLeft: getBorder(theme),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: theme.palette.primary[100],
      outline: 0,
    },
  },
});

const CellBase = ({
  classes,
  className,
  children,
  time,
  date,
  createNewAppointment,
  ...restProps
}) => {
  const onDoubleClick = createNewAppointment
    ? {
      onDoubleClick: () => createNewAppointment({ date, start: time.start, end: time.end }),
    } : null;
  return (
    <TableCell
      tabIndex={0}
      className={classNames(classes.cell, className)}
      {...onDoubleClick}
      {...restProps}
    >
      {children}
    </TableCell>
  );
};

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  time: PropTypes.object.isRequired,
  date: PropTypes.instanceOf(Date),
  children: PropTypes.node,
  className: PropTypes.string,
  addAppointment: PropTypes.func,
};

CellBase.defaultProps = {
  children: null,
  date: undefined,
  className: undefined,
  addAppointment: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
