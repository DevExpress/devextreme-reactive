import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../../../utils';

const day = { day: 'numeric' };

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
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  text: {
    padding: theme.spacing.unit,
  },
  today: {
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
  today,
  otherMonth,
  formatDate,
  ...restProps
}) => (
  <TableCell
    tabIndex={0}
    className={classNames(classes.cell, className)}
    {...restProps}
  >
    <div
      className={classNames({
        [classes.text]: !today,
        [classes.today]: today,
        [classes.otherMonth]: otherMonth && !today,
      })}
    >
      {formatDate(startDate, day)}
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
  otherMonth: PropTypes.bool,
};

CellBase.defaultProps = {
  endDate: undefined,
  className: undefined,
  today: false,
  otherMonth: false,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
