import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { getBorder } from '../utils';

const styles = theme => ({
  cell: {
    padding: 0,
    height: theme.spacing(5.75),
    borderLeft: getBorder(theme),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  shadedCell: {
    backgroundColor: theme.palette.action.hover,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
});

const CellBase = ({
  classes,
  className,
  children,
  startDate,
  endDate,
  isShaded,
  ...restProps
}) => (
  <TableCell
    tabIndex={0}
    className={classNames({
      [classes.cell]: true,
      [classes.shadedCell]: isShaded,
    }, className)}
    {...restProps}
  >
    {children}
  </TableCell>
);

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  children: PropTypes.node,
  className: PropTypes.string,
  isShaded: PropTypes.bool,
};

CellBase.defaultProps = {
  children: null,
  startDate: undefined,
  endDate: undefined,
  className: undefined,
  isShaded: false,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
