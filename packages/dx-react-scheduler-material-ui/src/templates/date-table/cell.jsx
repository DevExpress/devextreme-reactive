import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from '../utils';

const styles = theme => ({
  cell: {
    borderLeft: getBorderColor(theme),
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
  time,
  day,
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
  time: PropTypes.array,
  day: PropTypes.string,
};

CellBase.defaultProps = {
  children: null,
  time: [],
  day: '',
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
