import React from 'react';
import PropTypes from 'prop-types';

export const TableFilterCell = ({
  style, filter, onFilter, children,
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
        onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
      />
    )}
  </th>
);

TableFilterCell.propTypes = {
  style: PropTypes.object,
  filter: PropTypes.object,
  onFilter: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

TableFilterCell.defaultProps = {
  style: null,
  filter: null,
  onFilter: () => {},
  children: undefined,
};
