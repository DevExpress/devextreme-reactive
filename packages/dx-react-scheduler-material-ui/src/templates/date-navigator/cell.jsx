import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = ({ palette, spacing }) => ({
  cell: {
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  otherMonth: {
    color: palette.text.disabled,
  },
  current: {
    display: 'inline-block',
    width: `${spacing.unit * 4}px`,
    lineHeight: `${spacing.unit * 4}px`,
    borderRadius: '50%',
    background: palette.primary.main,
    color: palette.primary.contrastText,
    cursor: 'default',
  },
});

export const CellBase = ({
  otherMonth,
  current,
  classes,
  children,
  className,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
      [classes.otherMonth]: otherMonth,
    }, className)}
    {...restProps}
  >
    <span
      className={classNames({
        [classes.current]: current,
      })}
    >
      {children}
    </span>
  </TableCell>
);

CellBase.propTypes = {
  children: PropTypes.node,
  otherMonth: PropTypes.bool,
  current: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

CellBase.defaultProps = {
  children: undefined,
  otherMonth: false,
  current: false,
  className: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
