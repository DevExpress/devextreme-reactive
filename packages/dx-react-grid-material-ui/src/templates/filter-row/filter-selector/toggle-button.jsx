import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';

export const ToggleButton = ({
  buttonRef, onToggle, disabled, children, ...restProps
}) => (
  <IconButton
    buttonRef={buttonRef}
    onClick={onToggle}
    disabled={disabled}
    {...restProps}
    size="large">
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
