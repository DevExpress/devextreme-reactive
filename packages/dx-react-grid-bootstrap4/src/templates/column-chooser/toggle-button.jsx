import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TOGGLE_BUTTON_ID } from './constants';

export const ToggleButton = ({
  onToggle, className,
  getMessage, buttonRef,
  ...restProps
}) => (
  <button
    id={TOGGLE_BUTTON_ID}
    className={classNames('btn btn-outline-secondary', className)}
    onClick={onToggle}
    ref={buttonRef}
    {...restProps}
  >
    <span className="oi oi-eye" />
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
