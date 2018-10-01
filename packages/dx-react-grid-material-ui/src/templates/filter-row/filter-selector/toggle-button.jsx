import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';

export const ToggleButton = ({
  buttonRef, onToggle, disabled, children, ...restProps
}) => (
  <IconButton
    buttonRef={buttonRef}
    onClick={onToggle}
    disabled={disabled}
    {...restProps}
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
