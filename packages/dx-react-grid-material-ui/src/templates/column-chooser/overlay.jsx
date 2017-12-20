import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'material-ui';

export const Overlay = ({
  open, onRequestClose,
  children, anchorEl,
  ...restProps
}) => (
  <Popover
    open={open}
    anchorEl={anchorEl}
    onRequestClose={onRequestClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    {...restProps}
  >
    {children}
  </Popover>
);

Overlay.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
};

Overlay.defaultProps = {
  open: false,
  anchorEl: null,
};
