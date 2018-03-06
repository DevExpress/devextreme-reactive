import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from 'material-ui/Input';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  inputRoot: {
    width: '100%',
  },
  inputRight: {
    textAlign: 'right',
  },
  inputCenter: {
    textAlign: 'center',
  },
});

const EditCellBase = ({
  column, value, onValueChange, style, classes, children,
  row, tableRow, tableColumn, editingEnabled, className, ...restProps
}) => {
  const inputClasses = classNames({
    [classes.inputRight]: tableColumn && tableColumn.align === 'right',
    [classes.inputCenter]: tableColumn && tableColumn.align === 'center',
  });

  return (
    <TableCell
      className={classNames(classes.cell, className)}
      style={style}
      {...restProps}
    >
      {children || (
        <Input
          className={classes.inputRoot}
          classes={{ input: inputClasses }}
          value={value || ''}
          disabled={!editingEnabled}
          onChange={e => onValueChange(e.target.value)}
        />
      )}
    </TableCell>
  );
};

EditCellBase.propTypes = {
  column: PropTypes.object,
  row: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  editingEnabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

EditCellBase.defaultProps = {
  column: undefined,
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  value: '',
  style: null,
  children: undefined,
  className: undefined,
  editingEnabled: true,
};

export const EditCell = withStyles(styles, { name: 'EditCell' })(EditCellBase);
