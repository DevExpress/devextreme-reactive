import * as React from 'react';
import { styled, alpha, TableCell } from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import {
  VIEW_TYPES, HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION,
} from '@devexpress/dx-scheduler-core';
import { getBorder, getBrightBorder } from '../utils';
import { SPACING_CELL_HEIGHT } from '../constants';

const PREFIX = 'Cell';

export const classes = {
  cell: `${PREFIX}-cell`,
  brightRightBorder: `${PREFIX}-brightRightBorder`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    padding: 0,
    height: theme.spacing(SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL]),
    boxSizing: 'border-box',
    borderRight: getBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      outline: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
  },
  [`&.${classes.brightRightBorder}`]: {
    borderRight: getBrightBorder(theme),
  },
}));

export const Cell = ({
  className,
  children,
  startDate,
  endDate,
  endOfGroup,
  groupingInfo,
  groupOrientation,
  // @deprecated
  hasRightBorder,
  ...restProps
}) => (
  <StyledTableCell
    tabIndex={0}
    className={classNames({
      [classes.cell]: true,
      [classes.brightRightBorder]: groupOrientation === HORIZONTAL_GROUP_ORIENTATION
          && (endOfGroup || hasRightBorder),
    }, className)}
    {...restProps}
  >
    {children}
  </StyledTableCell>
);
Cell.propTypes = {
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  children: PropTypes.node,
  className: PropTypes.string,
  hasRightBorder: PropTypes.bool,
  endOfGroup: PropTypes.bool,
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
  groupOrientation: PropTypes.oneOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
};

Cell.defaultProps = {
  children: null,
  startDate: undefined,
  endDate: undefined,
  className: undefined,
  hasRightBorder: false,
  endOfGroup: false,
  groupingInfo: undefined,
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
};
