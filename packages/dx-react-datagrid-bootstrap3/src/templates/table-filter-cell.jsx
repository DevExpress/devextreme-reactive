import React from 'react';

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
  column: React.PropTypes.shape(),
  style: React.PropTypes.shape(),
  filter: React.PropTypes.string,
  changeFilter: React.PropTypes.func,
};

TableFilterCell.defaultProps = {
  column: {},
  style: null,
  filter: '',
  changeFilter: () => {},
};
