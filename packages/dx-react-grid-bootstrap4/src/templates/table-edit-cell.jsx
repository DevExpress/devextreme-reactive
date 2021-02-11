import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const EditCell = ({
  column, value, onValueChange, className, children,
  row, tableRow, tableColumn, editingEnabled,
  autoFocus, onBlur, onFocus, onKeyDown, ...restProps
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
      className={classNames('align-middle dx-g-bs4-table-edit-cell', className)}
      {...restProps}
    >
      {patchedChildren || (
        <input
          type="text"
          className={classNames({
            'form-control w-100': true,
            'text-right': tableColumn && tableColumn.align === 'right',
            'text-center': tableColumn && tableColumn.align === 'center',
          })}
          readOnly={!editingEnabled}
          value={value}
          onChange={e => onValueChange(e.target.value)}
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
  className: PropTypes.string,
  editingEnabled: PropTypes.bool,
  children: PropTypes.node,
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
};
EditCell.defaultProps = {
  column: undefined,
  row: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  className: undefined,
  children: undefined,
  editingEnabled: true,
  value: '',
  onValueChange: () => {},
  autoFocus: false,
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
};
