import React from 'react';
import PropTypes from 'prop-types';

export const FilterCell = ({ filter, changeFilter }) => (
  <input
    type="text"
    className="form-control input-sm"
    value={filter}
    onChange={e => changeFilter(e.target.value)}
    style={{ width: '100%' }}
  />
);

FilterCell.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

FilterCell.defaultProps = {
  filter: undefined,
  changeFilter: undefined,
};
