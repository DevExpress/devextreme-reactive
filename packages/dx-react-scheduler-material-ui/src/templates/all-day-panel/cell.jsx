import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
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

const StyledTableCell = styled(TableCell)((
  {
    theme,
  },
) => ({
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

const CellBase = ({
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
CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  children: PropTypes.node,
  className: PropTypes.string,
  hasRightBorder: PropTypes.bool,
  endOfGroup: PropTypes.bool,
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
  groupOrientation: PropTypes.oneOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
};

CellBase.defaultProps = {
  children: null,
  startDate: undefined,
  endDate: undefined,
  className: undefined,
  hasRightBorder: false,
  endOfGroup: false,
  groupingInfo: undefined,
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
};

export const Cell = (CellBase);
