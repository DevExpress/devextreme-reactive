import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const EditCellBase = ({
  column, value, onValueChange, className, children,
  row, tableRow, tableColumn, editingEnabled,
  autoFocus, onBlur, onFocus, onKeyDown,
  refObject, updateRefForKeyboardNavigation, setFocusedElement, ...restProps
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
      className={classNames({
        'align-middle dx-g-bs4-table-edit-cell': true,
        'dx-g-bs4-focus-cell': !!updateRefForKeyboardNavigation,
      }, className)}
      ref={refObject}
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
EditCellBase.propTypes = {
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
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};
EditCellBase.defaultProps = {
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
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const EditCell = withKeyboardNavigation()(EditCellBase);
