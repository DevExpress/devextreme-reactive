import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '@material-ui/core/Input';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    padding: theme.spacing(1),
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
  row, tableRow, tableColumn, editingEnabled, className,
  autoFocus, onBlur, ...restProps
}) => {
  const inputClasses = classNames({
    [classes.inputRight]: tableColumn && tableColumn.align === 'right',
    [classes.inputCenter]: tableColumn && tableColumn.align === 'center',
  });
  const patchedChildren = children ? React.cloneElement(children, { autoFocus, onBlur }) : children;

  return (
    <TableCell
      className={classNames(classes.cell, className)}
      style={style}
      {...restProps}
    >
      {patchedChildren || (
        <Input
          className={classes.inputRoot}
          classes={{ input: inputClasses }}
          value={value || ''}
          disabled={!editingEnabled}
          onChange={e => onValueChange(e.target.value)}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          onBlur={onBlur}
        />
      )}
    </TableCell>
  );
};

EditCellBase.propTypes = {
  column: PropTypes.object,
  row: PropTypes.any,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  editingEnabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
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
  autoFocus: false,
  onBlur: () => {},
};

export const EditCell = withStyles(styles, { name: 'EditCell' })(EditCellBase);
