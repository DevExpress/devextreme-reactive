import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const SelectionControl = ({
  disabled, selected, someSelected, onToggle,
  className, ...restProps
}) => (
  <input
    className={classNames({
      'd-inline-block': true,
      'dx-rg-bs4-cursor-pointer': !disabled,
    }, className)}
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
  className: PropTypes.string,
};

SelectionControl.defaultProps = {
  disabled: false,
  selected: false,
  someSelected: false,
  onToggle: () => {},
  className: undefined,
};
