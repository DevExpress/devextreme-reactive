import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from '../utils';

const styles = theme => ({
  cell: {
    borderRight: getBorderColor(theme),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: theme.palette.primary[100],
      outline: 0,
    },
  },
});

const CellBase = ({
  classes,
  children,
  ...restProps
}) => (
  <TableCell
    tabIndex={0}
    className={classes.cell}
    {...restProps}
  >
    {children}
  </TableCell>
);

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

CellBase.defaultProps = {
  children: null,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
