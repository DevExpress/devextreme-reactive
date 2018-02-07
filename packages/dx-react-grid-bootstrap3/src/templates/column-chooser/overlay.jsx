import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Overlay as OverlayBS3 } from 'react-bootstrap';

const Popover = ({ children, style }) => (
  <div
    className="dropdown-menu"
    style={{
      ...style,
      padding: 0,
      display: 'block',
      border: 'none',
    }}
  >
    {children}
  </div>
);

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

Popover.defaultProps = {
  style: undefined,
};

export const Overlay = ({
  visible, target,
  children, onHide,
  ...restProps
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
  target: PropTypes.object,
};

Overlay.defaultProps = {
  visible: false,
  target: null,
};
