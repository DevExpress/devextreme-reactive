import React from 'react';

export const SelectAllCell = ({ style, allSelected, someSelected, toggleAll }) => (
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
SelectAllCell.defaultProps = {
  style: null,
};
SelectAllCell.propTypes = {
  allSelected: React.PropTypes.bool.isRequired,
  someSelected: React.PropTypes.bool.isRequired,
  toggleAll: React.PropTypes.func.isRequired,
  style: React.PropTypes.shape(),
};
