import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import focusedStyle from '../utils/get-focused-style';

const styles = ({ spacing }) => ({
  cell: {
    padding: 0,
    '&:first-child': {
      paddingLeft: spacing(3),
    },
  },
  flexContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  focusedCell: focusedStyle,
});

const TableFilterCellBase = ({
  filter, getMessage, onFilter,
  classes, children, className,
  tableRow, tableColumn, column, filteringEnabled, refObject,
  setRefForKeyboardNavigation,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
      [classes.focusedCell]: setRefForKeyboardNavigation !== undefined,
    }, className)}
    ref={refObject}
    {...restProps}
  >
    <div className={classes.flexContainer}>
      {children}
    </div>
  </TableCell>
);

TableFilterCellBase.propTypes = {
  filter: PropTypes.object,
  onFilter: PropTypes.func,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  column: PropTypes.object,
  filteringEnabled: PropTypes.bool,
};

TableFilterCellBase.defaultProps = {
  filter: null,
  onFilter: () => {},
  children: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  column: undefined,
  filteringEnabled: true,
};

export const TableFilterCell = withKeyboardNavigation()(withStyles(styles, { name: 'TableFilterCell' })(TableFilterCellBase));
