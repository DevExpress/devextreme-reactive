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
  style, allSelected, someSelected, selectionAvailable, toggleAll, classes,
}) => {
  const cellClasses = classNames({
    [classes.cell]: true,
    [classes.pointer]: selectionAvailable,
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
        disabled={!selectionAvailable}
        onClick={(e) => {
          if (!selectionAvailable) return;

          e.stopPropagation();
          toggleAll();
        }}
      />
    </TableCell>
  );
};

TableSelectAllCellBase.propTypes = {
  style: PropTypes.object,
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  selectionAvailable: PropTypes.bool,
  toggleAll: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

TableSelectAllCellBase.defaultProps = {
  style: null,
  allSelected: false,
  someSelected: false,
  selectionAvailable: false,
  toggleAll: () => {},
};

export const TableSelectAllCell = withStyles(styles, { name: 'TableSelectAllCell' })(TableSelectAllCellBase);
