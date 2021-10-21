import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableRow from '@mui/material/TableRow';
import withStyles from '@mui/styles/withStyles';
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
  highlighted,
  tableColumn,
  tableRow,
  forwardedRef,
  ...restProps
}) => (
  <TableRow
    ref={forwardedRef}
    className={classNames({ [classes.selected]: highlighted }, className)}
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
  highlighted: PropTypes.bool,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableSelectRowBase.defaultProps = {
  children: undefined,
  className: undefined,
  onToggle: () => {},
  row: undefined,
  selectByRowClick: false,
  highlighted: false,
  tableColumn: undefined,
  tableRow: undefined,
  forwardedRef: undefined,
};

export const TableSelectRow = withStyles(styles, { name: 'TableSelectRow' })(TableSelectRowBase);
