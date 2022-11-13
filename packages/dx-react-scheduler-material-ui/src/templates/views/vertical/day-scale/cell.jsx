import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import { WEEK_DAY_OPTIONS, DAY_OPTIONS } from '@devexpress/dx-scheduler-core';
import { getBrightBorder } from '../../../utils';
import { LAYOUT_MEDIA_QUERY } from '../../../constants';

const PREFIX = 'Cell';

export const classes = {
  cell: `${PREFIX}-cell`,
  dayOfWeek: `${PREFIX}-dayOfWeek`,
  dayOfMonth: `${PREFIX}-dayOfMonth`,
  highlightedText: `${PREFIX}-highlightedText`,
  dayView: `${PREFIX}-dayView`,
  brightRightBorder: `${PREFIX}-brightRightBorder`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    userSelect: 'none',
    paddingBottom: theme.spacing(0.5),
    textAlign: 'center',
    borderBottom: 'none',
    paddingRight: 0,
    paddingLeft: 0,
    boxSizing: 'border-box',
    [`${LAYOUT_MEDIA_QUERY}`]: {
      padding: theme.spacing(1),
      paddingBottom: 0,
    },
    '&:only-child': {
      textAlign: 'left',
      paddingLeft: theme.spacing(2),
    },
    paddingTop: theme.spacing(0.5),
  },
  [`& .${classes.dayOfWeek}`]: {
    ...theme.typography.caption,
    margin: 0,
    color: theme.palette.text.secondary,
    lineHeight: 1.17,
  },
  [`& .${classes.dayOfMonth}`]: {
    ...theme.typography.h4,
    [`${LAYOUT_MEDIA_QUERY}`]: {
      ...theme.typography.h6,
    },
    color: theme.palette.text.secondary,
    lineHeight: 1.2,
    fontSize: '1.8rem',
  },
  [`& .${classes.highlightedText}`]: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  [`& .${classes.dayView}`]: {
    'td:only-child &': {
      textAlign: 'center',
      width: 'auto',
      display: 'inline-block',
    },
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
    <div className={classes.dayView}>
      <p
        className={classNames({
          [classes.dayOfWeek]: true,
          [classes.highlightedText]: today,
        })}
      >
        {formatDate(startDate, WEEK_DAY_OPTIONS)}
      </p>
      <div
        className={classNames({
          [classes.dayOfMonth]: true,
          [classes.highlightedText]: today,
        })}
      >
        {formatDate(startDate, DAY_OPTIONS)}
      </div>
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
