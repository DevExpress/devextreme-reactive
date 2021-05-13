import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCellMUI from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from './utils';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import focusedStyle from '../utils/get-focused-style';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    '&:first-child': {
      paddingLeft: theme.spacing(3),
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  footer: {
    borderBottom: getBorder(theme),
  },
  cellRightAlign: {
    textAlign: 'right',
  },
  cellCenterAlign: {
    textAlign: 'center',
  },
  cellNoWrap: {
    whiteSpace: 'nowrap',
  },
  focusedCell: focusedStyle
});

const TableCellBase = ({
  column, value, children, classes,
  tableRow, tableColumn, row,
  className, refObject, setRefForKeyboardNavigation,
  ...restProps
}) => (
  <TableCellMUI
      className={classNames({
        [classes.cell]: true,
        [classes.focusedCell]: setRefForKeyboardNavigation !== undefined,
        [classes.cellRightAlign]: tableColumn && tableColumn.align === 'right',
        [classes.cellCenterAlign]: tableColumn && tableColumn.align === 'center',
        [classes.cellNoWrap]: !(tableColumn && tableColumn.wordWrapEnabled),
      }, className)}
      classes={{ footer: classes.footer }}
      ref={refObject}
      {...restProps}
    >
      {children || value}
  </TableCellMUI>
);

TableCellBase.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
};

TableCellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};

export const TableCell = withKeyboardNavigation()(withStyles(styles, { name: 'TableCell' })(TableCellBase));
