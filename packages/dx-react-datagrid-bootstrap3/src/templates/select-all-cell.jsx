import React from 'react';

export const SelectAllCell = ({ allSelected, someSelected, toggleAll }) => (
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
    style={{ margin: '0' }}
  />
);

SelectAllCell.propTypes = {
  allSelected: React.PropTypes.bool.isRequired,
  someSelected: React.PropTypes.bool.isRequired,
  toggleAll: React.PropTypes.func.isRequired,
};
