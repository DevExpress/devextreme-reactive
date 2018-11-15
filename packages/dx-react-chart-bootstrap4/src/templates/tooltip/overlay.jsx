import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Popover, PopoverBody } from 'reactstrap';

export const Overlay = ({
  visible, children, target, ...restProps
}) => (
  <Popover
    placement="top"
    isOpen={visible}
    target={target}
    {...restProps}
  >
    <PopoverBody>
      {children}
    </PopoverBody>
  </Popover>
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  target: PropTypes.func.isRequired,
};
