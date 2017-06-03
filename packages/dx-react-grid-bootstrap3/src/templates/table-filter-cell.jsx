import React from 'react';
import PropTypes from 'prop-types';

export const TableFilterCell = ({ style, column, filter, setFilter }) => (
  <th
    style={{
      fontWeight: 'normal',
      ...style,
    }}
  >
    {!column.type && (
      <input
        type="text"
        className="form-control"
        value={filter ? filter.value : ''}
        onChange={e => setFilter({ value: e.target.value })}
      />
    )}
  </th>
);

TableFilterCell.propTypes = {
  column: PropTypes.object,
  style: PropTypes.object,
  filter: PropTypes.object,
  setFilter: PropTypes.func,
};

TableFilterCell.defaultProps = {
  column: {},
  style: null,
  filter: null,
  setFilter: () => {},
};
