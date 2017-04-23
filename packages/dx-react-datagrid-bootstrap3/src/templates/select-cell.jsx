import React from 'react';
import PropTypes from 'prop-types';

export const SelectCell = ({ selected, changeSelected }) => (
  <input
    type="checkbox"
    checked={selected}
    onChange={changeSelected}
  />
);

SelectCell.propTypes = {
  selected: PropTypes.bool.isRequired,
  changeSelected: PropTypes.func.isRequired,
};
