import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { WEEK_DAY_OPTIONS, DAY_OPTIONS } from '@devexpress/dx-scheduler-core';
import { getBrightBorder } from '../../../utils';
import { LAYOUT_MEDIA_QUERY } from '../../../constants';

const styles = theme => ({
  cell: {
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
  dayOfWeek: {
    ...theme.typography.caption,
    margin: 0,
    color: theme.palette.text.secondary,
    lineHeight: 1.17,
  },
  dayOfMonth: {
    ...theme.typography.h4,
    [`${LAYOUT_MEDIA_QUERY}`]: {
      ...theme.typography.h6,
    },
    color: theme.palette.text.secondary,
    lineHeight: 1.2,
    fontSize: '1.8rem',
  },
  highlightedText: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  dayView: {
    'td:only-child &': {
      textAlign: 'center',
      width: 'auto',
      display: 'inline-block',
    },
  },
  brightRightBorder: {
    borderRight: getBrightBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
  },
});

const CellBase = ({
  classes,
  className,
  startDate,
  endDate,
  today,
  formatDate,
  endOfGroup,
  groupingInfo,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
      [classes.brightRightBorder]: endOfGroup,
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
  </TableCell>
);

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  today: PropTypes.bool,
  endOfGroup: PropTypes.bool,
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
};

CellBase.defaultProps = {
  className: undefined,
  endDate: undefined,
  today: false,
  endOfGroup: false,
  groupingInfo: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
