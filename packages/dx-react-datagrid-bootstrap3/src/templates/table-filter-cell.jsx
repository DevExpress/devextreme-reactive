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
        className="form-control input-sm"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ width: '100%' }}
      />
    )}
  </th>
);

TableFilterCell.propTypes = {
  column: PropTypes.shape(),
  style: PropTypes.shape(),
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

TableFilterCell.defaultProps = {
  column: {},
  style: null,
  filter: '',
  setFilter: () => {},
};
