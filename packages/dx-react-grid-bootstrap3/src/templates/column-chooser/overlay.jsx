import React from 'react';
import PropTypes from 'prop-types';
import { Overlay as OverlayBS3, Popover } from 'react-bootstrap';

export const Overlay = ({
  open, anchorEl,
  children, onRequestClose,
  ...restProps
}) => (
  <OverlayBS3
    show={open}
    target={anchorEl}
    onHide={onRequestClose}
    placement="bottom"
    rootClose
    {...restProps}
  >
    <Popover id="popover-contained">
      {children}
    </Popover>
  </OverlayBS3>
);

Overlay.propTypes = {
  anchorEl: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

Overlay.defaultProps = {
  open: false,
};
