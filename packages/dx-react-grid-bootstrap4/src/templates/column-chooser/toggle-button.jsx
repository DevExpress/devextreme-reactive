import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TOGGLE_BUTTON_ID } from './constants';

export const ToggleButton = ({
  onToggle, className,
  getMessage, buttonRef,
  style, ...restProps
}) => (
  <button
    id={TOGGLE_BUTTON_ID}
    className={classNames('btn btn-outline-secondary', className)}
    style={{ borderColor: 'transparent', ...style }}
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
  style: PropTypes.object,
};

ToggleButton.defaultProps = {
  className: undefined,
  style: undefined,
};
