import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectAllCell = ({
  style, allSelected, someSelected, selectionAvailable, toggleAll,
  tableColumn, tableRow,
  ...restProps
}) => (
  <th
    style={{
      cursor: selectionAvailable && 'pointer',
      verticalAlign: 'middle',
      ...style,
    }}
    onClick={(e) => {
      if (!selectionAvailable) return;

      e.stopPropagation();
      toggleAll();
    }}
    {...restProps}
  >
    <input
      style={{
        cursor: selectionAvailable && 'pointer',
        margin: '0 auto',
        display: 'block',
      }}
      type="checkbox"
      disabled={!selectionAvailable}
      checked={allSelected}
      ref={(ref) => {
        if (ref) {
          const checkbox = ref;
          checkbox.indeterminate = someSelected;
        }
      }}
      onChange={toggleAll}
      onClick={e => e.stopPropagation()}
    />
  </th>
);

TableSelectAllCell.propTypes = {
  style: PropTypes.object,
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  selectionAvailable: PropTypes.bool,
  toggleAll: PropTypes.func,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableSelectAllCell.defaultProps = {
  style: null,
  allSelected: false,
  someSelected: false,
  selectionAvailable: false,
  toggleAll: () => {},
  tableRow: undefined,
  tableColumn: undefined,
};
