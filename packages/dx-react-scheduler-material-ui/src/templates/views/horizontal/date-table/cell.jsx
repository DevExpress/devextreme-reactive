import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../../../utils';

const styles = theme => ({
  cell: {
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: theme.palette.primary[100],
      outline: 0,
    },
  },
  text: {
    padding: theme.spacing.unit,
  },
  current: {
    margin: theme.spacing.unit / 2,
    display: 'inline-block',
    width: `${theme.spacing.unit * 3}px`,
    height: `${theme.spacing.unit * 3}px`,
    lineHeight: `${theme.spacing.unit * 3}px`,
    textAlign: 'center',
    borderRadius: '50%',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: 'default',
  },
  otherMonth: {
    color: theme.palette.text.disabled,
  },
});

const CellBase = ({
  classes,
  className,
  startDate,
  endDate,
  isCurrent,
  isOtherMonth,
  ...restProps
}) => (
  <TableCell
    tabIndex={0}
    className={classNames(classes.cell, className)}
    {...restProps}
  >
    <div
      className={classNames({
        [classes.text]: !isCurrent,
        [classes.current]: isCurrent,
        [classes.otherMonth]: isOtherMonth,
      })}
    >
      {moment(startDate).format('D')}
    </div>
  </TableCell>
);

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  isCurrent: PropTypes.bool.isRequired,
  isOtherMonth: PropTypes.bool.isRequired,
};

CellBase.defaultProps = {
  endDate: undefined,
  className: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
