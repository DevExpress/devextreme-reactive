import React from 'react';

export const SelectCell = ({ style, selected, changeSelected }) => (
  <td
    style={style}
    onClick={changeSelected}
  >
    <input
      type="checkbox"
      checked={selected}
      onChange={changeSelected}
      onClick={e => e.stopPropagation()}
    />
  </td>
);
SelectCell.defaultProps = {
  style: null,
};
SelectCell.propTypes = {
  selected: React.PropTypes.bool.isRequired,
  changeSelected: React.PropTypes.func.isRequired,
  style: React.PropTypes.shape(),
};
