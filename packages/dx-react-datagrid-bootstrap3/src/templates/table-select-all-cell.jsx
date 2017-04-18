import React from 'react';

export const TableSelectAllCell = ({ style, allSelected, someSelected, toggleAll }) => (
  <th style={style}>
    <input
      type="checkbox"
      checked={allSelected}
      ref={(ref) => {
        if (ref) {
          const checkbox = ref;
          checkbox.indeterminate = someSelected;
        }
      }}
      onChange={toggleAll}
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
  style: React.PropTypes.shape(),
  allSelected: React.PropTypes.bool,
  someSelected: React.PropTypes.bool,
  toggleAll: React.PropTypes.func,
};
