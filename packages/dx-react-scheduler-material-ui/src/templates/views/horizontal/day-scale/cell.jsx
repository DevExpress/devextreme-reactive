import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { WEEK_DAY_OPTIONS } from '@devexpress/dx-scheduler-core';
import { getBorder, getBrightBorder } from '../../../utils';

const styles = theme => ({
  cell: {
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
  dayOfWeek: {
    ...theme.typography.caption,
    margin: 0,
    padding: theme.spacing(1),
    paddingBottom: 0,
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
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
    <div className={classes.dayOfWeek}>
      {formatDate(startDate, WEEK_DAY_OPTIONS)}
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
