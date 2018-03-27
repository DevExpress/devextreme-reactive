import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from 'material-ui/Checkbox';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import { groupCellHeight } from './table-band-header/cell';

const styles = theme => ({
  cell: {
    overflow: 'visible',
    paddingRight: 0,
    paddingLeft: theme.spacing.unit,
    textAlign: 'center',
  },
  pointer: {
    cursor: 'pointer',
  },
});

const TableSelectAllCellBase = ({
  style, allSelected, someSelected, disabled, onToggle, classes,
  className, tableRow, tableColumn, rowSpan,
  ...restProps
}) => {
  const cellClasses = classNames({
    [classes.cell]: true,
    [classes.pointer]: !disabled,
  }, className);

  const paddingTop = rowSpan > 1 ? (groupCellHeight * (rowSpan - 1)) : '';

  return (
    <TableCell
      padding="checkbox"
      style={{ ...style, paddingTop: `${paddingTop}px` }}
      className={cellClasses}
      rowSpan={rowSpan}
      {...restProps}
    >
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected}
        disabled={disabled}
        onClick={(e) => {
          if (disabled) return;

          e.stopPropagation();
          onToggle();
        }}
      />
    </TableCell>
  );
};

TableSelectAllCellBase.propTypes = {
  style: PropTypes.object,
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  rowSpan: PropTypes.number,
};

TableSelectAllCellBase.defaultProps = {
  style: null,
  allSelected: false,
  someSelected: false,
  disabled: false,
  onToggle: () => {},
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  rowSpan: undefined,
};

export const TableSelectAllCell = withStyles(styles, { name: 'TableSelectAllCell' })(TableSelectAllCellBase);
