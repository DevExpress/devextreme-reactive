import React from 'react';

export const TableSelectCell = ({ style, selected, changeSelected }) => (
  <td
    style={style}
    onClick={(e) => {
      e.stopPropagation();
      changeSelected();
    }}
  >
    <input
      type="checkbox"
      checked={selected}
      onChange={changeSelected}
      onClick={e => e.stopPropagation()}
    />
  </td>
);
TableSelectCell.defaultProps = {
  style: null,
  selected: false,
  changeSelected: () => {},
};
TableSelectCell.propTypes = {
  style: React.PropTypes.shape(),
  selected: React.PropTypes.bool,
  changeSelected: React.PropTypes.func,
};
