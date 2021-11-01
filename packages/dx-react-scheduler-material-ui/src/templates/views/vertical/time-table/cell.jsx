import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION, VIEW_TYPES } from '@devexpress/dx-scheduler-core';
import { getBorder, getBrightBorder } from '../../../utils';
import { SPACING_CELL_HEIGHT } from '../../../constants';

const PREFIX = 'Cell';

export const classes = {
  cell: `${PREFIX}-cell`,
  shadedCell: `${PREFIX}-shadedCell`,
  shadedPart: `${PREFIX}-shadedPart`,
  brightRightBorder: `${PREFIX}-brightRightBorder`,
  brightBorderBottom: `${PREFIX}-brightBorderBottom`,
};

const StyledTableCell = styled(TableCell)(({ theme, shadedHeight }) => ({
  [`&.${classes.cell}`]: {
    position: 'relative',
    height: theme.spacing(SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK]),
    padding: 0,
    boxSizing: 'border-box',
    borderRight: getBorder(theme),
    '&:last-child': {
      borderRight: 'none',
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  [`&.${classes.shadedCell}`]: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  [`& .${classes.shadedPart}`]: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    position: 'absolute',
    height: shadedHeight,
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
  [`&.${classes.brightRightBorder}`]: {
    borderRight: getBrightBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
  },
  [`&.${classes.brightBorderBottom}`]: {
    borderBottom: getBrightBorder(theme),
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
  endOfGroup,
  groupingInfo,
  groupOrientation,
  // @deprecated
  hasRightBorder,
  ...restProps
}) => {
  const isNow = !!currentTimeIndicatorPosition;
  return (
    <StyledTableCell
      shadedHeight={currentTimeIndicatorPosition}
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
        [classes.shadedCell]: isShaded && !isNow,
        [classes.brightRightBorder]: (endOfGroup || hasRightBorder)
          && groupOrientation === HORIZONTAL_GROUP_ORIENTATION,
        [classes.brightBorderBottom]: endOfGroup
          && groupOrientation === VERTICAL_GROUP_ORIENTATION,
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
    </StyledTableCell>
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
  endOfGroup: PropTypes.bool,
  hasRightBorder: PropTypes.bool,
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
  groupOrientation: PropTypes.oneOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
};

Cell.defaultProps = {
  children: null,
  className: undefined,
  startDate: new Date(),
  endDate: new Date(),
  currentTimeIndicatorPosition: undefined,
  currentTimeIndicatorComponent: () => null,
  isShaded: false,
  endOfGroup: false,
  hasRightBorder: false,
  groupingInfo: undefined,
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
};
