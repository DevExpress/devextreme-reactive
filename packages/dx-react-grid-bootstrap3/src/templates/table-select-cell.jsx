import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectCell = ({ style, selected, changeSelected }) => (
  <td
    style={{
      cursor: 'pointer',
      verticalAlign: 'middle',
      ...style,
    }}
    onClick={(e) => {
      e.stopPropagation();
      changeSelected();
    }}
  >
    <input
      style={{
        cursor: 'pointer',
        margin: '0 auto',
        display: 'block',
      }}
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
  style: PropTypes.object,
  selected: PropTypes.bool,
  changeSelected: PropTypes.func,
};
