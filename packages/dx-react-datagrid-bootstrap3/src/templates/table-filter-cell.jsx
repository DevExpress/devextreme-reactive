import React from 'react';
import PropTypes from 'prop-types';

export const TableFilterCell = ({ style, column, filter, changeFilter }) => (
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
        onChange={e => changeFilter(e.target.value)}
        style={{ width: '100%' }}
      />
    )}
  </th>
);

TableFilterCell.propTypes = {
  column: PropTypes.shape(),
  style: PropTypes.shape(),
  filter: PropTypes.string,
  changeFilter: PropTypes.func,
};

TableFilterCell.defaultProps = {
  column: {},
  style: null,
  filter: '',
  changeFilter: () => {},
};
