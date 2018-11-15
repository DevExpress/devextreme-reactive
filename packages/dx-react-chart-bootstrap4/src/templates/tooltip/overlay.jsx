import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Popover, PopoverBody } from 'reactstrap';

export const Overlay = ({
  children, target, ...restProps
}) => (
  <Popover
    placement="top"
    isOpen
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
  target: PropTypes.func.isRequired,
};
