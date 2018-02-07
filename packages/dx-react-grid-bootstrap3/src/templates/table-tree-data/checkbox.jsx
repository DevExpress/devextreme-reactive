import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Checkbox = ({
  disabled, selected, indeterminate, onToggle,
  className, ...restProps
}) => (
  <input
    style={{
      display: 'inline-block',
      cursor: !disabled && 'pointer',
      margin: 0,
      marginRight: '16px',
    }}
    type="checkbox"
    disabled={disabled}
    checked={selected}
    ref={(ref) => {
      if (ref) {
        const checkbox = ref;
        checkbox.indeterminate = indeterminate;
      }
    }}
    onChange={onToggle}
    onClick={e => e.stopPropagation()}
    {...restProps}
  />
);

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  disabled: false,
  selected: false,
  indeterminate: false,
  onToggle: () => {},
  className: undefined,
};
