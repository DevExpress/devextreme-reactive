import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'reactstrap';

const modifiers = {
  arrow: {
    enabled: false,
    element: null,
  },
};

export const Overlay = ({
  visible, children, toggle, target, onHide, ...restProps
}) => (
  target ? (
    <Popover
      placement="bottom"
      isOpen={visible}
      target={target}
      toggle={toggle}
      container={target ? target.parentElement : undefined}
      modifiers={modifiers}
      {...restProps}
    >
      {children}
    </Popover>
  ) : null
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  toggle: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  target: PropTypes.object,
  onHide: PropTypes.func,
};

Overlay.defaultProps = {
  visible: false,
  target: undefined,
  onHide: undefined,
};
