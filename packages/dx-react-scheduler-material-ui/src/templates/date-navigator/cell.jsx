import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  otherMonth: {
    color: theme.palette.text.disabled,
  },
  cell: {
    border: 'none',
  },
});

export const CellBase = ({
  otherMonth,
  classes,
  children,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
      [classes.otherMonth]: otherMonth,
    })}
    {...restProps}
  >
    {children}
  </TableCell>
);

CellBase.propTypes = {
  children: PropTypes.node,
  otherMonth: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

CellBase.defaultProps = {
  children: undefined,
  otherMonth: false,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
