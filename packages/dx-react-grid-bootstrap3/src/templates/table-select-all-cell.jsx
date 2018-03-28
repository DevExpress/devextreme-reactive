import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableSelectAllCell = ({
  style, allSelected, someSelected, disabled, onToggle,
  tableColumn, tableRow, rowSpan,
  ...restProps
}) => {
  const toggle = (e) => {
    if (disabled) return;

    e.stopPropagation();
    onToggle();
  };

  return (
    <th
      style={{
        cursor: !disabled && 'pointer',
        ...(rowSpan ? { verticalAlign: 'bottom' } : { verticalAlign: 'middle' }),
        ...style,
      }}
      rowSpan={rowSpan}
      onClick={toggle}
      {...restProps}
    >
      <input
        style={{
          cursor: !disabled && 'pointer',
          ...(rowSpan ? { margin: '4px auto' } : { margin: '0 auto' }),
          display: 'block',
        }}
        type="checkbox"
        disabled={disabled}
        checked={allSelected}
        ref={(ref) => {
          if (ref) {
            const checkbox = ref;
            checkbox.indeterminate = someSelected;
          }
        }}
        onChange={toggle}
        onClick={e => e.stopPropagation()}
      />
    </th>
  );
};

TableSelectAllCell.propTypes = {
  style: PropTypes.object,
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  rowSpan: PropTypes.number,
};

TableSelectAllCell.defaultProps = {
  style: null,
  allSelected: false,
  someSelected: false,
  disabled: false,
  onToggle: () => {},
  tableRow: undefined,
  tableColumn: undefined,
  rowSpan: undefined,
};
