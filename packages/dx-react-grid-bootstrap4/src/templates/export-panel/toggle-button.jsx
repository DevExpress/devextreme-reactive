import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const ToggleButton = ({
  onToggle, getMessage, buttonRef, className,
  ...restProps
}) => (
  <button
    type="button"
    className={classNames('btn btn-outline-secondary border-0', className)}
    onClick={onToggle}
    ref={buttonRef}
    {...restProps}
  >
    <span className="oi oi-data-transfer-download" />
  </button>
);

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  buttonRef: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ToggleButton.defaultProps = {
  className: undefined,
};
