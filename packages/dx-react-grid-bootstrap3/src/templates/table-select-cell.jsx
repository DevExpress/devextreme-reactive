import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectCell = ({ style, selected, onToggle }) => (
  <td
    style={{
      cursor: 'pointer',
      verticalAlign: 'middle',
      ...style,
    }}
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
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
      onChange={onToggle}
      onClick={e => e.stopPropagation()}
    />
  </td>
);
TableSelectCell.defaultProps = {
  style: null,
  selected: false,
  onToggle: () => {},
};
TableSelectCell.propTypes = {
  style: PropTypes.object,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
};
