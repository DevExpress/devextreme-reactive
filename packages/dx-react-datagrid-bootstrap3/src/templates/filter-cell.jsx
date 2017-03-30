import React from 'react';

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
  filter: React.PropTypes.string,
  changeFilter: React.PropTypes.func.isRequired,
};

FilterCell.defaultProps = {
  filter: undefined,
  changeFilter: undefined,
};
