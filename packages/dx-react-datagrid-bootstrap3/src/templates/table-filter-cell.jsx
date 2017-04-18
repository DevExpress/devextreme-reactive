import React from 'react';

export const TableFilterCell = ({ style, filter, changeFilter }) => (
  <td
    style={style}
  >
    <input
      type="text"
      className="form-control input-sm"
      value={filter}
      onChange={e => changeFilter(e.target.value)}
      style={{ width: '100%' }}
    />
  </td>
);

TableFilterCell.propTypes = {
  style: React.PropTypes.shape(),
  filter: React.PropTypes.string,
  changeFilter: React.PropTypes.func,
};

TableFilterCell.defaultProps = {
  style: null,
  filter: '',
  changeFilter: () => {},
};
