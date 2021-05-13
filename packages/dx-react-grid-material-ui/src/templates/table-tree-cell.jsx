import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCellMUI from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import focusedStyle from '../utils/get-focused-style';

const styles = theme => ({
  cell: {
    padding: theme.spacing(0.5, 1),
    '&:first-child': {
      paddingLeft: theme.spacing(3),
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellNoWrap: {
    whiteSpace: 'nowrap',
  },
  cellRightAlign: {
    textAlign: 'right',
  },
  cellCenterAlign: {
    textAlign: 'center',
  },
  focusedCell: focusedStyle,
});

const TableTreeCellBase = ({
  column, value, children, classes,
  tableRow, tableColumn, row,
  className, refObject, setRefForKeyboardNavigation,
  ...restProps
}) => (
  <TableCellMUI
    className={classNames({
      [classes.cell]: true,
      [classes.cellNoWrap]: !(tableColumn && tableColumn.wordWrapEnabled),
      [classes.cellRightAlign]: tableColumn && tableColumn.align === 'right',
      [classes.cellCenterAlign]: tableColumn && tableColumn.align === 'center',
      [classes.focusedCell]: setRefForKeyboardNavigation !== undefined,
    }, className)}
    ref={refObject}
    {...restProps}
  >
    <div className={classes.container}>
      {children}
    </div>
  </TableCellMUI>
);

TableTreeCellBase.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
};

TableTreeCellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};

export const TableTreeCell = withKeyboardNavigation()(withStyles(styles)(TableTreeCellBase));
