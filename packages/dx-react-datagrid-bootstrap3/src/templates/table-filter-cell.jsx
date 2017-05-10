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
        className="form-control"
        value={filter ? filter.value : ''}
        onChange={e => changeFilter({ value: e.target.value })}
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
