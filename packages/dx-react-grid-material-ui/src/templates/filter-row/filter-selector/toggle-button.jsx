import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';

export const ToggleButton = ({
  buttonRef, onToggle, disabled, children, ...restProps
}) => (
  <IconButton
    ref={buttonRef}
    onClick={onToggle}
    disabled={disabled}
    {...restProps}
    size="large"
  >
    {children}
  </IconButton>
);

ToggleButton.propTypes = {
  buttonRef: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

ToggleButton.defaultProps = {
  children: undefined,
  disabled: false,
};
