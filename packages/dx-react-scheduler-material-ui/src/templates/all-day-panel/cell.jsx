import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { getBorder, getBrightBorder } from '../utils';

const styles = theme => ({
  cell: {
    padding: 0,
    height: theme.spacing(5.75),
    boxSizing: 'border-box',
    borderRight: getBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
  },
  brightRightBorder: {
    borderRight: getBrightBorder(theme),
  },
});

const CellBase = ({
  classes,
  className,
  children,
  startDate,
  endDate,
  endOfGroup,
  groupingInfo,
  // @deprecated
  hasRightBorder,
  ...restProps
}) => (
  <TableCell
    tabIndex={0}
    className={classNames({
      [classes.cell]: true,
      [classes.brightRightBorder]: endOfGroup || hasRightBorder,
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
  hasRightBorder: PropTypes.bool,
  endOfGroup: PropTypes.bool,
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
};

CellBase.defaultProps = {
  children: null,
  startDate: undefined,
  endDate: undefined,
  className: undefined,
  hasRightBorder: false,
  endOfGroup: false,
  groupingInfo: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
