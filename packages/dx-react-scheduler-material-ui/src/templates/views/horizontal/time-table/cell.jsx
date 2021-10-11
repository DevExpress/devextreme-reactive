import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import { alpha } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import {
  DAY_OPTIONS, DAY_SHORT_MONTH_OPTIONS,
  HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION,
  VIEW_TYPES,
} from '@devexpress/dx-scheduler-core';
import { getBorder, getBrightBorder } from '../../../utils';
import { SMALL_LAYOUT_MEDIA_QUERY, SPACING_CELL_HEIGHT } from '../../../constants';

const styles = theme => ({
  cell: {
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
  text: {
    padding: '1em',
    paddingTop: '0.5em',
    textAlign: 'center',
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      padding: '0.5em',
    },
  },
  today: {
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
  otherMonth: {
    color: theme.palette.text.disabled,
  },
  shadedCell: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  brightRightBorder: {
    borderRight: getBrightBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
  },
  brightBorderBottom: {
    borderBottom: getBrightBorder(theme),
  },
});

const CellBase = React.memo(({
  classes,
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
    <TableCell
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
    </TableCell>
  );
});

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
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

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
