import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from '../utils';

const styles = theme => ({
  cell: {
    // borderTop: getBorderColor(theme),
  },
});

const CellBase = ({
  classes,
  children,
  ...restProps
}) => (
  <TableCell
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
