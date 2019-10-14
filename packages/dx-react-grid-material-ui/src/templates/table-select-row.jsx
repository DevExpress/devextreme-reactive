import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import getSelectionColor from '../utils/get-selection-color';

const styles = theme => ({
  selected: {
    backgroundColor: getSelectionColor(theme),
  },
});

const TableSelectRowBase = ({
  children,
  classes,
  className,
  onToggle,
  row,
  selectByRowClick,
  selected,
  tableColumn,
  tableRow,
  ...restProps
}) => (
  <TableRow
    className={classNames({ [classes.selected]: selected }, className)}
    onClick={(e) => {
      if (!selectByRowClick) return;
      e.stopPropagation();
      onToggle();
    }}
    {...restProps}
  >
    {children}
  </TableRow>
);

TableSelectRowBase.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onToggle: PropTypes.func,
  row: PropTypes.any,
  selectByRowClick: PropTypes.bool,
  selected: PropTypes.bool,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
};

TableSelectRowBase.defaultProps = {
  children: undefined,
  className: undefined,
  onToggle: () => {},
  row: undefined,
  selectByRowClick: false,
  selected: false,
  tableColumn: undefined,
  tableRow: undefined,
};

export const TableSelectRow = withStyles(styles, { name: 'TableSelectRow' })(TableSelectRowBase);
