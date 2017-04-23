import React from 'react';
import PropTypes from 'prop-types';

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
  />
);

SelectAllCell.propTypes = {
  allSelected: PropTypes.bool.isRequired,
  someSelected: PropTypes.bool.isRequired,
  toggleAll: PropTypes.func.isRequired,
};
