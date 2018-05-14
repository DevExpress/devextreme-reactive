import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const EditCell = ({
  column, value, onValueChange, className, children,
  row, tableRow, tableColumn, editingEnabled, ...restProps
}) => (
  <td
    className={classNames('align-middle dx-g-bs4-table-edit-cell', className)}
    {...restProps}
  >
    {children || (
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
      />
    )}
  </td>
);
EditCell.propTypes = {
  column: PropTypes.object,
  row: PropTypes.any,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  editingEnabled: PropTypes.bool,
  children: PropTypes.node,
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
};
