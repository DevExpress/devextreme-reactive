import * as React from 'react';
import PropTypes from 'prop-types';

export const EditCell = ({
  column, value, onValueChange, style, children,
  row, tableRow, tableColumn, editingEnabled,
  autoFocus, onBlur, onFocus, onKeyDown,
  forwardedRef, ...restProps
}) => {
  const patchedChildren = children
    ? React.cloneElement(children, {
      autoFocus,
      onBlur,
      onFocus,
      onKeyDown,
    })
    : children;

  return (
    <td
      ref={forwardedRef}
      style={{
        verticalAlign: 'middle',
        padding: '1px',
        ...style,
      }}
      {...restProps}
    >
      {patchedChildren || (
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={e => onValueChange(e.target.value)}
          readOnly={!editingEnabled}
          style={{
            width: '100%',
            textAlign: tableColumn && tableColumn.align,
          }}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
        />
      )}
    </td>
  );
};

EditCell.propTypes = {
  column: PropTypes.object,
  row: PropTypes.any,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  value: PropTypes.any,
  onValueChange: PropTypes.func,
  style: PropTypes.object,
  editingEnabled: PropTypes.bool,
  children: PropTypes.node,
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  forwardedRef: PropTypes.func,
};

EditCell.defaultProps = {
  column: undefined,
  row: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  value: '',
  onValueChange: () => {},
  style: null,
  children: undefined,
  editingEnabled: true,
  autoFocus: false,
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  forwardedRef: undefined,
};
