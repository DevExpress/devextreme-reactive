import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import { getCurrentTimeIndicatorTop } from '@devexpress/dx-scheduler-core';
import { getBorder } from '../../../utils';

const useStyles = makeStyles(theme => ({
  cell: {
    position: 'relative',
    height: theme.spacing(6),
    padding: 0,
    borderLeft: getBorder(theme),
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
    '&:last-child': {
      paddingRight: 0,
    },
  },
  shadedCell: {
    backgroundColor: theme.palette.action.hover,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  shadedPart: {
    backgroundColor: theme.palette.action.hover,
    position: 'absolute',
    height: ({ shadedHeight }) => shadedHeight,
    width: '100%',
    left: 0,
    top: 0,
    'td:focus &': {
      opacity: 0,
    },
  },
}));

export const Cell = ({
  className,
  children,
  startDate,
  endDate,
  currentTime,
  currentTimeIndicatorComponent: CurrentTimeIndicator,
  isShaded,
  ...restProps
}) => {
  const isNow = !!currentTime && currentTime.getTime() <= endDate.getTime()
    && currentTime.getTime() > startDate.getTime();
  const shadedHeight = getCurrentTimeIndicatorTop(startDate, endDate, currentTime);
  const classes = useStyles({ shadedHeight });

  return (
    <TableCell
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
        [classes.shadedCell]: isShaded && !isNow,
      }, className)}
      {...restProps}
    >
      {isNow && isShaded && (
        <div className={classes.shadedPart} />
      )}
      {isNow && (
        <CurrentTimeIndicator
          startDate={startDate}
          endDate={endDate}
          currentTime={currentTime}
        />
      )}
      {children}
    </TableCell>
  );
};

Cell.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  children: PropTypes.node,
  className: PropTypes.string,
  currentTime: PropTypes.instanceOf(Date),
  currentTimeIndicatorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isShaded: PropTypes.bool,
};

Cell.defaultProps = {
  children: null,
  className: undefined,
  startDate: new Date(),
  endDate: new Date(),
  currentTime: undefined,
  currentTimeIndicatorComponent: () => null,
  isShaded: false,
};
