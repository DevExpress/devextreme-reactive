import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectAllCell = (
  { style, allSelected, someSelected, selectionExists, toggleAll },
) => (
  <th
    style={{
      cursor: selectionExists && 'pointer',
      ...style,
    }}
    onClick={(e) => {
      if (!selectionExists) return;

      e.stopPropagation();
      toggleAll();
    }}
  >
    <input
      style={{
        cursor: selectionExists && 'pointer',
        margin: 0,
      }}
      type="checkbox"
      disabled={!selectionExists}
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
  selectionExists: false,
  toggleAll: () => {},
};
TableSelectAllCell.propTypes = {
  style: PropTypes.shape(),
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  selectionExists: PropTypes.bool,
  toggleAll: PropTypes.func,
};
