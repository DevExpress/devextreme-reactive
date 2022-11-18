import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const SelectionControl = ({
  disabled, checked, indeterminate, onChange, className, ...restProps
}) => (
  <input
    className={classNames({
      'd-inline-block': true,
      'dx-g-bs4-cursor-pointer': !disabled,
    }, className)}
    type="checkbox"
    disabled={disabled}
    checked={checked}
    ref={(ref) => {
      if (ref) {
        ref.indeterminate = indeterminate; // eslint-disable-line no-param-reassign
      }
    }}
    onChange={() => {
      if (disabled) return;
      onChange();
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
  className: PropTypes.string,
};

SelectionControl.defaultProps = {
  disabled: false,
  checked: false,
  indeterminate: false,
  onChange: () => {},
  className: undefined,
};
