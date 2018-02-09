import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Popover } from 'reactstrap';

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
