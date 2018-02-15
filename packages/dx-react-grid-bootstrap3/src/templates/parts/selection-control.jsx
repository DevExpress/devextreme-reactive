import * as React from 'react';
import * as PropTypes from 'prop-types';

export const SelectionControl = ({
  disabled, selected, someSelected, onToggle,
  style, ...restProps
}) => (
  <input
    style={{
      display: 'inline-block',
      cursor: !disabled && 'pointer',
      margin: '0 5px',
      ...style,
    }}
    type="checkbox"
    disabled={disabled}
    checked={selected}
    ref={(ref) => {
      if (!ref) return;
      ref.indeterminate = someSelected; // eslint-disable-line no-param-reassign
    }}
    onChange={() => {
      if (disabled) return;
      onToggle();
    }}
    onClick={e => e.stopPropagation()}
    {...restProps}
  />
);

SelectionControl.propTypes = {
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  someSelected: PropTypes.bool,
  onToggle: PropTypes.func,
  style: PropTypes.object,
};

SelectionControl.defaultProps = {
  disabled: false,
  selected: false,
  someSelected: false,
  onToggle: () => {},
  style: null,
};
