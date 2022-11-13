import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';

import {
  DAY_OPTIONS, DAY_SHORT_MONTH_OPTIONS,
  HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION,
  VIEW_TYPES,
} from '@devexpress/dx-scheduler-core';
import { getBorder, getBrightBorder } from '../../../utils';
import { SMALL_LAYOUT_MEDIA_QUERY, SPACING_CELL_HEIGHT } from '../../../constants';

const PREFIX = 'Cell';

export const classes = {
  cell: `${PREFIX}-cell`,
  text: `${PREFIX}-text`,
  today: `${PREFIX}-today`,
  otherMonth: `${PREFIX}-otherMonth`,
  shadedCell: `${PREFIX}-shadedCell`,
  brightRightBorder: `${PREFIX}-brightRightBorder`,
  brightBorderBottom: `${PREFIX}-brightBorderBottom`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: theme.spacing(SPACING_CELL_HEIGHT[VIEW_TYPES.MONTH]),
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
    boxSizing: 'border-box',
  },
  [`& .${classes.text}`]: {
    padding: '1em',
    paddingTop: '0.5em',
    textAlign: 'center',
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      padding: '0.5em',
    },
  },
  [`& .${classes.today}`]: {
    marginTop: '0.33em',
    width: '1.72em',
    height: '1.72em',
    lineHeight: 1.72,
    textAlign: 'center',
    borderRadius: '50%',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: 'default',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  [`& .${classes.otherMonth}`]: {
    color: theme.palette.text.disabled,
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

const CellBase = React.memo(({
  className,
  startDate,
  endDate,
  today,
  otherMonth,
  formatDate,
  isShaded,
  endOfGroup,
  groupingInfo,
  groupOrientation,
  // @deprecated
  hasRightBorder,
  ...restProps
}) => {
  const isFirstMonthDay = startDate.getDate() === 1;
  const formatOptions = isFirstMonthDay && !today ? DAY_SHORT_MONTH_OPTIONS : DAY_OPTIONS;
  return (
    <StyledTableCell
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
        [classes.shadedCell]: isShaded,
        [classes.brightRightBorder]: (endOfGroup || hasRightBorder)
          && groupOrientation === HORIZONTAL_GROUP_ORIENTATION,
        [classes.brightBorderBottom]: endOfGroup
          && groupOrientation === VERTICAL_GROUP_ORIENTATION,
      }, className)}
      {...restProps}
    >
      <div
        className={classNames({
          [classes.text]: !today,
          [classes.today]: today,
          [classes.otherMonth]: otherMonth && !today,
        })}
      >
        {formatDate(startDate, formatOptions)}
      </div>
    </StyledTableCell>
  );
});

CellBase.propTypes = {
  formatDate: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  today: PropTypes.bool,
  otherMonth: PropTypes.bool,
  isShaded: PropTypes.bool,
  endOfGroup: PropTypes.bool,
  hasRightBorder: PropTypes.bool,
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
  groupOrientation: PropTypes.oneOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
};

CellBase.defaultProps = {
  endDate: undefined,
  className: undefined,
  today: false,
  otherMonth: false,
  isShaded: false,
  endOfGroup: false,
  hasRightBorder: false,
  groupingInfo: undefined,
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
};

export const Cell = (CellBase);
