import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from '../../utils';

const styles = theme => ({
  cell: {
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorderColor(theme),
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
  date,
  ...restProps
}) => (
  <TableCell
    tabIndex={0}
    className={classNames(classes.cell, className)}
    {...restProps}
  >
    <div
      className={classNames({
        [classes.text]: !date.isCurrent,
        [classes.current]: date.isCurrent,
        [classes.otherMonth]: date.isOtherMonth,
      })}
    >
      {moment(date.value).format('D')}
    </div>
  </TableCell>
);

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.object,
  className: PropTypes.string,
};

CellBase.defaultProps = {
  date: undefined,
  className: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
