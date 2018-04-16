import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from 'material-ui/Checkbox';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  cell: {
    overflow: 'visible',
    paddingRight: 0,
    paddingLeft: theme.spacing.unit,
    textAlign: 'center',
  },
  alignWithRowSpan: {
    verticalAlign: 'bottom',
    paddingBottom: theme.spacing.unit / 2,
  },
  pointer: {
    cursor: 'pointer',
  },
});

const TableSelectAllCellBase = ({
  allSelected, someSelected, disabled, onToggle, classes,
  className, tableRow, tableColumn, rowSpan,
  ...restProps
}) => {
  const cellClasses = classNames({
    [classes.cell]: true,
    [classes.pointer]: !disabled,
    [classes.alignWithRowSpan]: rowSpan > 1,
  }, className);

  return (
    <TableCell
      padding="checkbox"
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
