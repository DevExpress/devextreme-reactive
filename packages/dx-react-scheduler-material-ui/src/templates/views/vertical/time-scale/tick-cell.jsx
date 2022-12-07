import * as React from 'react';
import { styled, TableCell } from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { VIEW_TYPES } from '@devexpress/dx-scheduler-core';
import { getBorder, getBrightBorder } from '../../../utils';
import { SPACING_CELL_HEIGHT } from '../../../constants';

const PREFIX = 'TickCell';

export const classes = {
  cell: `${PREFIX}-cell`,
  brightBottomBorder: `${PREFIX}-brightBottomBorder`,
  allDayCell: `${PREFIX}-allDayCell`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    height: theme.spacing(SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK]),
    padding: 0,
    boxSizing: 'border-box',
    borderBottom: getBorder(theme),
    'tr:last-child &': {
      borderBottom: 'none',
    },
  },
  [`&.${classes.brightBottomBorder}`]: {
    borderBottom: getBrightBorder(theme),
  },
  [`&.${classes.allDayCell}`]: {
    height: theme.spacing(SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL]),
  },
}));

export const TickCell = ({
  className,
  startDate,
  endDate,
  endOfGroup,
  groupingInfo,
  isAllDay,
  ...restProps
}) => (
  <StyledTableCell
    className={classNames({
      [classes.cell]: true,
      [classes.brightBottomBorder]: endOfGroup,
      [classes.allDayCell]: isAllDay,
    }, className)}
    {...restProps}
  />
);

TickCell.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  endOfGroup: PropTypes.bool,
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
  isAllDay: PropTypes.bool,
  className: PropTypes.string,
};

TickCell.defaultProps = {
  className: undefined,
  startDate: undefined,
  endDate: undefined,
  endOfGroup: false,
  groupingInfo: undefined,
  isAllDay: false,
};
