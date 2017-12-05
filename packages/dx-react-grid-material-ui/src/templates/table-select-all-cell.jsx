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
});

const TableSelectAllCellBase = ({
  style, allSelected, someSelected, disabled, onToggle, classes,
}) => {
  const cellClasses = classNames({
    [classes.cell]: true,
    [classes.pointer]: !disabled,
  });

  return (
    <TableCell
      padding="checkbox"
      style={style}
      className={cellClasses}
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
};

TableSelectAllCellBase.defaultProps = {
  style: null,
  allSelected: false,
  someSelected: false,
  disabled: false,
  onToggle: () => {},
};

export const TableSelectAllCell = withStyles(styles, { name: 'TableSelectAllCell' })(TableSelectAllCellBase);
