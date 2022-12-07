import * as React from 'react';
import { styled, TableCell } from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { WEEK_DAY_OPTIONS } from '@devexpress/dx-scheduler-core';
import { getBorder, getBrightBorder } from '../../../utils';

const PREFIX = 'Cell';

export const classes = {
  cell: `${PREFIX}-cell`,
  dayOfWeek: `${PREFIX}-dayOfWeek`,
  brightRightBorder: `${PREFIX}-brightRightBorder`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    userSelect: 'none',
    padding: 0,
    borderBottom: 'none',
    borderRight: getBorder(theme),
    '&:last-child': {
      borderRight: 'none',
      paddingRight: 0,
    },
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  [`& .${classes.dayOfWeek}`]: {
    ...theme.typography.caption,
    margin: 0,
    padding: theme.spacing(1),
    paddingBottom: 0,
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
  },
  [`&.${classes.brightRightBorder}`]: {
    borderRight: getBrightBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
  },
}));

export const Cell = ({
  className,
  startDate,
  endDate,
  today,
  formatDate,
  endOfGroup,
  groupingInfo,
  // @deprecated
  hasRightBorder,
  ...restProps
}) => (
  <StyledTableCell
    className={classNames({
      [classes.cell]: true,
      [classes.brightRightBorder]: endOfGroup || hasRightBorder,
    }, className)}
    {...restProps}
  >
    <div className={classes.dayOfWeek}>
      {formatDate(startDate, WEEK_DAY_OPTIONS)}
    </div>
  </StyledTableCell>
);
Cell.propTypes = {
  formatDate: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  today: PropTypes.bool,
  endOfGroup: PropTypes.bool,
  hasRightBorder: PropTypes.bool,
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
};

Cell.defaultProps = {
  className: undefined,
  endDate: undefined,
  today: false,
  endOfGroup: false,
  hasRightBorder: false,
  groupingInfo: undefined,
};
