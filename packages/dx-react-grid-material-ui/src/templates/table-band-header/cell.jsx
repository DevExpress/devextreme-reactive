import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import focusedStyle from '../../utils/get-focused-style';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    '&:first-child': {
      paddingLeft: theme.spacing(3),
    },
    '&:last-child': {
      paddingRight: theme.spacing(3),
      borderRight: 0,
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    borderBottom: getBorder(theme),
    borderRight: getBorder(theme),
  },
  beforeBorder: {
    borderLeft: getBorder(theme),
  },
  focusedCell: focusedStyle,
});

const CellBase = ({
  column, value, children, classes, tableRow, tableColumn, row, className, beforeBorder, refObject,
  setRefForKeyboardNavigation,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
      [classes.beforeBorder]: beforeBorder,
      [classes.focusedCell]: setRefForKeyboardNavigation !== undefined,
    }, className)}
    {...restProps}
    ref={refObject}
  >
    {children}
  </TableCell>
);

CellBase.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  beforeBorder: PropTypes.bool,
};

CellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  beforeBorder: false,
};

export const Cell = withKeyboardNavigation()(withStyles(styles, { name: 'Cell' })(CellBase));
