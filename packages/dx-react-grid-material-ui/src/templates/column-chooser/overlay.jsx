import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'material-ui';

export const Overlay = ({
  visible, onHide,
  children, target,
  ...restProps
}) => (
  <Popover
    open={visible}
    anchorEl={target}
    onClose={onHide}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    {...restProps}
  >
    {children}
  </Popover>
);

Overlay.propTypes = {
  onHide: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  target: PropTypes.object,
};

Overlay.defaultProps = {
  visible: false,
  target: null,
};
