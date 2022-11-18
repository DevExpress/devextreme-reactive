import * as React from 'react';
import PropTypes from 'prop-types';
import { Overlay as OverlayBS3 } from 'react-bootstrap';
import { Popover } from './popover';

export const Overlay = ({
  visible, target, children, onHide, ...restProps
}) => (
  <OverlayBS3
    show={visible}
    target={target}
    container={target ? target.parentElement : undefined}
    onHide={onHide}
    placement="bottom"
    rootClose
    animation={false}
    {...restProps}
  >
    <Popover>
      {children}
    </Popover>
  </OverlayBS3>
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  onHide: PropTypes.func.isRequired,
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
