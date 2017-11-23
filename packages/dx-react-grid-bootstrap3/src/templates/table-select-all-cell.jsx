import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectAllCell = ({
  style, selected, partiallySelected, disabled, onToggle,
}) => {
  const toggle = (e) => {
    if (disabled) return;

    e.stopPropagation();
    onToggle();
  };

  return (
    <th
      style={{
        cursor: !disabled && 'pointer',
        verticalAlign: 'middle',
        ...style,
      }}
      onClick={toggle}
    >
      <input
        style={{
          cursor: !disabled && 'pointer',
          margin: '0 auto',
          display: 'block',
        }}
        type="checkbox"
        disabled={disabled}
        checked={selected}
        ref={(ref) => {
          if (ref) {
            const checkbox = ref;
            checkbox.indeterminate = partiallySelected;
          }
        }}
        onChange={toggle}
        onClick={e => e.stopPropagation()}
      />
    </th>
  );
};

TableSelectAllCell.propTypes = {
  style: PropTypes.object,
  selected: PropTypes.bool,
  partiallySelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
};

TableSelectAllCell.defaultProps = {
  style: null,
  selected: false,
  partiallySelected: false,
  disabled: false,
  onToggle: () => {},
};
