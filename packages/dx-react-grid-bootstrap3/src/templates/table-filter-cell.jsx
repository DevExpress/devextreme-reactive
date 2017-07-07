import React from 'react';
import PropTypes from 'prop-types';

export const TableFilterCell = ({ style, filter, setFilter }) => (
  <th
    style={{
      fontWeight: 'normal',
      ...style,
    }}
  >
    <input
      type="text"
      className="form-control"
      value={filter ? filter.value : ''}
      onChange={e => setFilter(e.target.value ? { value: e.target.value } : null)}
    />
  </th>
);

TableFilterCell.propTypes = {
  style: PropTypes.object,
  filter: PropTypes.object,
  setFilter: PropTypes.func,
};

TableFilterCell.defaultProps = {
  style: null,
  filter: null,
  setFilter: () => {},
};
