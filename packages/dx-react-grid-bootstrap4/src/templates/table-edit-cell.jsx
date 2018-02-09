import * as React from 'react';
import * as PropTypes from 'prop-types';

export const EditCell = ({
  column, value, onValueChange, style, children,
  row, tableRow, tableColumn, ...restProps
}) => (
  <td
    style={{
      verticalAlign: 'middle',
      padding: '5px',
      ...style,
    }}
    {...restProps}
  >
    {children || (
      <input
        type="text"
        className="form-control w-100"
        value={value}
        onChange={e => onValueChange(e.target.value)}
        style={{
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
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
EditCell.defaultProps = {
  column: undefined,
  row: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  value: '',
  style: {},
  children: undefined,
};
