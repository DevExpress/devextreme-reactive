import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Input from '@mui/material/Input';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const PREFIX = 'TableEditCell';
export const classes = {
  cell: `${PREFIX}-cell`,
  inputRoot: `${PREFIX}-inputRoot`,
  disabledInput: `${PREFIX}-disabledInput`,
  inputRight: `${PREFIX}-inputRight`,
  inputCenter: `${PREFIX}-inputCenter`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    padding: theme.spacing(1),
    // NOTE: without the TableEditColumn first EditCell changes size
    // (because first TableCell and EditCell have different paddings)
    '&:first-of-type': {
      paddingLeft: theme.spacing(3),
    },
  },
}));

const StyledInput = styled(Input)(({ theme }) => ({
  [`&.${classes.inputRoot}`]: {
    width: '100%',
  },
  [`&.${classes.disabledInput}`]: {
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
  [`&.${classes.inputRight}`]: {
    textAlign: 'right',
  },
  [`&.${classes.inputCenter}`]: {
    textAlign: 'center',
  },
}));

export const EditCell = ({
  column, value, onValueChange, style, children,
  row, tableRow, tableColumn, editingEnabled, className,
  autoFocus, onBlur, onFocus, onKeyDown, forwardedRef, ...restProps
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
    <StyledTableCell
      className={classNames(classes.cell, className)}
      style={style}
      ref={forwardedRef}
      {...restProps}
    >
      {patchedChildren || (
        <StyledInput
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
    </StyledTableCell>
  );
};

EditCell.propTypes = {
  column: PropTypes.object,
  row: PropTypes.any,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  value: PropTypes.any,
  onValueChange: PropTypes.func,
  style: PropTypes.object,
  editingEnabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  forwardedRef: PropTypes.object,
};

EditCell.defaultProps = {
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
  forwardedRef: undefined,
};
