import * as React from 'react';
import * as PropTypes from 'prop-types';

export const EditCell = ({
  column, value, onValueChange, style, children,
  row, tableRow, tableColumn, editingEnabled, ...restProps
}) => (
  <td
    style={{
      verticalAlign: 'middle',
      padding: '1px',
      ...style,
    }}
    {...restProps}
  >
    {children || (
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
      />
    )}
  </td>
);

EditCell.propTypes = {
  column: PropTypes.object,
  row: PropTypes.object,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  editingEnabled: PropTypes.bool,
  children: PropTypes.node,
};

EditCell.defaultProps = {
  column: undefined,
  row: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  value: '',
  style: null,
  children: undefined,
  editingEnabled: true,
};
