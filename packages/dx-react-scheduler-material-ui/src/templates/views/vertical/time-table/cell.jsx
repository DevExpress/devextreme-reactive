import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import { getBorder, getBrightBorder } from '../../../utils';

const useStyles = makeStyles(theme => ({
  cell: {
    position: 'relative',
    height: theme.spacing(6),
    padding: 0,
    borderLeft: getBorder(theme),
    boxSizing: 'border-box',
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
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  shadedPart: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    position: 'absolute',
    height: ({ shadedHeight }) => shadedHeight,
    width: '100%',
    left: 0,
    top: 0,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    'td:focus &': {
      opacity: 0,
    },
  },
  lastHorizontalCell: {
    borderRight: getBrightBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
  },
}));

export const Cell = ({
  className,
  children,
  startDate,
  endDate,
  currentTimeIndicatorPosition,
  currentTimeIndicatorComponent: CurrentTimeIndicator,
  isShaded,
  isLastHorizontalGroupCell,
  groupingInfo,
  ...restProps
}) => {
  const classes = useStyles({ shadedHeight: currentTimeIndicatorPosition });
  const isNow = !!currentTimeIndicatorPosition;

  return (
    <TableCell
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
        [classes.shadedCell]: isShaded && !isNow,
        [classes.lastHorizontalCell]: isLastHorizontalGroupCell,
      }, className)}
      {...restProps}
    >
      {isNow && isShaded && (
        <div className={classes.shadedPart} />
      )}
      {isNow && (
        <CurrentTimeIndicator
          top={currentTimeIndicatorPosition}
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
  currentTimeIndicatorPosition: PropTypes.string,
  currentTimeIndicatorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isShaded: PropTypes.bool,
  isLastHorizontalGroupCell: PropTypes.bool,
};

Cell.defaultProps = {
  children: null,
  className: undefined,
  startDate: new Date(),
  endDate: new Date(),
  currentTimeIndicatorPosition: undefined,
  currentTimeIndicatorComponent: () => null,
  isShaded: false,
  isLastHorizontalGroupCell: false,
};
