import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectAllCell = ({ style, allSelected, someSelected, toggleAll }) => (
  <th
    style={{
      cursor: 'pointer',
      ...style,
    }}
    onClick={(e) => {
      e.stopPropagation();
      toggleAll();
    }}
  >
    <input
      style={{
        cursor: 'pointer',
        margin: 0,
      }}
      type="checkbox"
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
  toggleAll: () => {},
};
TableSelectAllCell.propTypes = {
  style: PropTypes.shape(),
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  toggleAll: PropTypes.func,
};
