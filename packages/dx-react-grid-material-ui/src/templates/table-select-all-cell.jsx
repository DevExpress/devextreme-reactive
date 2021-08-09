import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    overflow: 'visible',
    paddingRight: 0,
    paddingLeft: theme.spacing(1),
    textAlign: 'center',
  },
  checkbox: {
    padding: theme.spacing(1),
  },
  alignWithRowSpan: {
    verticalAlign: 'bottom',
    paddingBottom: theme.spacing(0.5),
  },
  pointer: {
    cursor: 'pointer',
  },
});

const TableSelectAllCellBase = ({
  allSelected, someSelected, disabled, onToggle, classes,
  className, tableRow, tableColumn, rowSpan,
  refObject,
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
      ref={refObject}
      {...restProps}
    >
      <Checkbox
        checked={allSelected}
        className={classes.checkbox}
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
  refObject: PropTypes.object,
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
  refObject: undefined,
};

export const TableSelectAllCell = withStyles(styles, { name: 'TableSelectAllCell' })(TableSelectAllCellBase);
