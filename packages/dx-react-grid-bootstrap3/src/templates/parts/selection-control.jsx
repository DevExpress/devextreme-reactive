import * as React from 'react';
import PropTypes from 'prop-types';

export const SelectionControl = ({
  disabled, checked, indeterminate, onChange, style, ...restProps
}) => (
  <input
    style={{
      display: 'inline-block',
      cursor: !disabled && 'pointer',
      margin: 0,
      ...style,
    }}
    type="checkbox"
    disabled={disabled}
    checked={checked}
    ref={(ref) => {
      if (ref) {
        ref.indeterminate = indeterminate; // eslint-disable-line no-param-reassign
      }
    }}
    onChange={() => {
      if (!disabled) {
        onChange();
      }
    }}
    onClick={e => e.stopPropagation()}
    {...restProps}
  />
);

SelectionControl.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

SelectionControl.defaultProps = {
  disabled: false,
  checked: false,
  indeterminate: false,
  onChange: () => {},
  style: null,
};
