import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectAllCell = (
  { style, allSelected, someSelected, selectionAvailable, toggleAll },
) => (
  <th
    style={{
      cursor: selectionAvailable && 'pointer',
      width: 30,
      ...style,
    }}
    onClick={(e) => {
      if (!selectionAvailable) return;

      e.stopPropagation();
      toggleAll();
    }}
  >
    <input
      style={{
        cursor: selectionAvailable && 'pointer',
        margin: 0,
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
TableSelectAllCell.defaultProps = {
  style: null,
  allSelected: false,
  someSelected: false,
  selectionAvailable: false,
  toggleAll: () => {},
};
TableSelectAllCell.propTypes = {
  style: PropTypes.shape(),
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  selectionAvailable: PropTypes.bool,
  toggleAll: PropTypes.func,
};
