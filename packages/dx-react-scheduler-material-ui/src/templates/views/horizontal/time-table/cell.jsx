import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { DAY_OPTIONS } from '@devexpress/dx-scheduler-core';
import { getBorder } from '../../../utils';

const styles = theme => ({
  cell: {
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:first-child': {
      borderLeft: 'none',
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  text: {
    padding: theme.spacing(1),
  },
  today: {
    margin: theme.spacing(0.5),
    display: 'inline-block',
    width: theme.spacing(3),
    height: theme.spacing(3),
    lineHeight: `${theme.spacing(3)}px`,
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
      {formatDate(startDate, DAY_OPTIONS)}
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
