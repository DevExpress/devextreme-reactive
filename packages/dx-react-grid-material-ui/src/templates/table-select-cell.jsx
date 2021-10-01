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
    marginTop: '-1px',
    marginBottom: '-1px',
    padding: theme.spacing(1),
  },
});

export const TableSelectCellBase = ({
  style, selected, onToggle, classes,
  className, row, tableRow, tableColumn,
  refObject,
  ...restProps
}) => (
  <TableCell
    padding="checkbox"
    style={style}
    ref={refObject}
    className={classNames(classes.cell, className)}
    {...restProps}
  >
    <Checkbox
      className={classes.checkbox}
      checked={selected}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    />
  </TableCell>
);

TableSelectCellBase.propTypes = {
  style: PropTypes.object,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
  classes: PropTypes.object.isRequired,
  row: PropTypes.any,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  refObject: PropTypes.object,
};

TableSelectCellBase.defaultProps = {
  style: null,
  selected: false,
  onToggle: () => {},
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  refObject: undefined,
};

export const TableSelectCell = withStyles(styles, { name: 'TableSelectCell' })(TableSelectCellBase);
