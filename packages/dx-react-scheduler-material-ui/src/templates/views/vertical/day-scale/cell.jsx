import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { WEEK_DAY_OPTIONS, DAY_OPTIONS } from '@devexpress/dx-scheduler-core';
import { getBorder, getBrightBorder } from '../../../utils';

const styles = theme => ({
  cell: {
    userSelect: 'none',
    paddingBottom: theme.spacing(0.5),
    textAlign: 'center',
    borderBottom: 'none',
    paddingRight: 0,
    paddingLeft: 0,
    boxSizing: 'border-box',
    '@media (max-width: 700px)': {
      padding: theme.spacing(1),
      paddingBottom: 0,
    },
    'table:last-child &': {
      borderBottom: getBorder(theme),
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
  },
  dayOfMonth: {
    ...theme.typography.h4,
    '@media (max-width: 700px)': {
      ...theme.typography.h6,
    },
    color: theme.palette.text.secondary,
    lineHeight: 1.5,
  },
  today: {
    width: '1.5em',
    height: '1.5em',
    lineHeight: 1.5,
    textAlign: 'center',
    borderRadius: '50%',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: 'default',
    paddingBottom: 0,
    marginRight: 'auto',
    marginLeft: 'auto',
    'td:only-child &': {
      marginRight: 0,
      marginLeft: 0,
    },
  },
  highlight: {
    color: theme.palette.primary.main,
  },
  dayView: {
    'td:only-child &': {
      textAlign: 'center',
      width: 'auto',
      display: 'inline-block',
    },
  },
  lastHorizontalCell: {
    borderRight: getBrightBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
  },
});

const CellBase = React.memo(({
  classes,
  className,
  startDate,
  endDate,
  today,
  formatDate,
  isLastHorizontalGroupCell,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
      [classes.lastHorizontalCell]: isLastHorizontalGroupCell,
    }, className)}
    {...restProps}
  >
    <div className={classes.dayView}>
      <p
        className={classNames({
          [classes.dayOfWeek]: true,
          [classes.highlight]: today,
        })}
      >
        {formatDate(startDate, WEEK_DAY_OPTIONS)}
      </p>
      <div
        className={classNames({
          [classes.dayOfMonth]: true,
          [classes.today]: today,
        })}
      >
        {formatDate(startDate, DAY_OPTIONS)}
      </div>
    </div>
  </TableCell>
));

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  today: PropTypes.bool,
  isLastHorizontalGroupCell: PropTypes.bool,
};

CellBase.defaultProps = {
  className: undefined,
  endDate: undefined,
  today: false,
  isLastHorizontalGroupCell: false,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
