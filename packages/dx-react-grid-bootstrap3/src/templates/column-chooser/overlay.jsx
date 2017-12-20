import React from 'react';
import PropTypes from 'prop-types';
import { Overlay as OverlayBS3, Popover } from 'react-bootstrap';

export const Overlay = ({
  visible, target,
  children, onHide,
  ...restProps
}) => (
  <OverlayBS3
    show={visible}
    target={target}
    onHide={onHide}
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
  target: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  onHide: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

Overlay.defaultProps = {
  visible: false,
};
