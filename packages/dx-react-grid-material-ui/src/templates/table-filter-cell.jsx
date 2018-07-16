import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ palette, spacing }) => ({
  cell: {
    paddingRight: spacing.unit,
    paddingLeft: spacing.unit,
    '&:first-child': {
      paddingLeft: spacing.unit * 3,
    },
    position: 'relative',
    borderBottom: 'none',
    '&:before': {
      content: '""',
      position: 'absolute',
      background: palette.divider,
      height: 1,
      bottom: 0,
      right: 0,
      left: 0,
    },
  },
  flexContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});

const TableFilterCellBase = ({
  filter, getMessage, onFilter,
  classes, children, className,
  tableRow, tableColumn, column, filteringEnabled,
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.cell, className)}
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

export const TableFilterCell = withStyles(styles, { name: 'TableFilterCell' })(TableFilterCellBase);
