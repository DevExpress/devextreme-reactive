import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const ToggleButton = ({
  onToggle, className,
  getMessage, buttonRef,
  active, ...restProps
}) => (
  <button
    type="button"
    className={classNames('btn btn-link', className)}
    onClick={onToggle}
    ref={buttonRef}
    {...restProps}
  >
    <i className="glyphicon glyphicon-eye-close" />
  </button>
);

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
