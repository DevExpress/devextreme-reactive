import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const ToggleButton = ({
  onToggle, className,
  getMessage, buttonRef,
  active, ...restProps
}) => {
  const buttonClasses = classNames({
    btn: true,
    'btn-outline-secondary': true,
    'border-0': true,
    active,
  }, className);
  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onToggle}
      ref={buttonRef}
      {...restProps}
    >
      <span className="oi oi-eye" />
    </button>
  );
};

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  buttonRef: PropTypes.func.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
};

ToggleButton.defaultProps = {
  className: undefined,
  active: false,
};
