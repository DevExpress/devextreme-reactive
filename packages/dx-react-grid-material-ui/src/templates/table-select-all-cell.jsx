import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Checkbox,
  TableCell,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';

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
  className, tableRow, tableColumn,
  ...restProps
}) => {
  const cellClasses = classNames({
    [classes.cell]: true,
    [classes.pointer]: !disabled,
  }, className);

  return (
    <TableCell
      padding="checkbox"
      style={style}
      className={cellClasses}
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
};

export const TableSelectAllCell = withStyles(styles, { name: 'TableSelectAllCell' })(TableSelectAllCellBase);
