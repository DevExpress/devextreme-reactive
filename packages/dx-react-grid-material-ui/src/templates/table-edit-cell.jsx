import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Input from '@material-ui/core/Input';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    padding: theme.spacing(1),
    // NOTE: without the TableEditColumn first EditCell changes size
    // (because first TableCell and EditCell have different paddings)
    '&:first-child': {
      paddingLeft: theme.spacing(3),
    },
  },
  inputRoot: {
    width: '100%',
  },
  disabledInput: {
    color: theme.palette.action.disabled,
    '&:before': {
      borderBottom: '1px dotted',
      borderBottomColor: theme.palette.action.disabled,
    },
    '&&:hover:before': {
      borderBottom: '1px dotted',
      borderBottomColor: theme.palette.action.disabled,
    },
    '&:after': {
      borderBottom: '0px',
    },
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
  autoFocus, onBlur, onFocus, onKeyDown, refObject, ...restProps
}) => {
  const inputClasses = classNames({
    [classes.inputRight]: tableColumn && tableColumn.align === 'right',
    [classes.inputCenter]: tableColumn && tableColumn.align === 'center',
  });
  const patchedChildren = children
    ? React.cloneElement(children, {
      autoFocus,
      onBlur,
      onFocus,
      onKeyDown,
    })
    : children;
  return (
    <TableCell
      className={classNames({
        [classes.cell]: true,
      }, className)}
      style={style}
      ref={refObject}
      {...restProps}
    >
      {patchedChildren || (
        <Input
          className={classNames({
            [classes.inputRoot]: true,
            [classes.disabledInput]: !editingEnabled,
          })}
          classes={{ input: inputClasses }}
          value={value}
          readOnly={!editingEnabled}
          onChange={e => onValueChange(e.target.value)}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
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
  onValueChange: PropTypes.func,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  editingEnabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  refObject: PropTypes.object,
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
  onValueChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  refObject: undefined,
};

export const EditCell = withStyles(styles, { name: 'EditCell' })(EditCellBase);
