import React from 'react';
import PropTypes from 'prop-types';

export const TableFilterCell = ({
  style, filter, setFilter, children,
}) => (
  <th
    style={{
      fontWeight: 'normal',
      ...style,
    }}
  >
    {children || (
      <input
        type="text"
        className="form-control"
        value={filter ? filter.value : ''}
        onChange={e => setFilter(e.target.value ? { value: e.target.value } : null)}
      />
    )}
  </th>
);

TableFilterCell.propTypes = {
  style: PropTypes.object,
  filter: PropTypes.object,
  setFilter: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

TableFilterCell.defaultProps = {
  style: null,
  filter: null,
  setFilter: () => {},
  children: undefined,
};
