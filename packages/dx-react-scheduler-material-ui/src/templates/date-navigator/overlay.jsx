import * as React from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';

const origin = { vertical: 'top', horizontal: 'right' };

export const Overlay = ({
  visible, onHide, children, target, ...restProps
}) => (
  <Popover
    open={visible}
    anchorEl={target}
    onClose={onHide}
    anchorOrigin={origin}
    transformOrigin={origin}
    {...restProps}
  >
    {children}
  </Popover>
);

Overlay.propTypes = {
  onHide: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  target: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
};

Overlay.defaultProps = {
  visible: false,
  target: null,
};
