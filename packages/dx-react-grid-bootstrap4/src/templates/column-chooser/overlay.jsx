import React from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverBody } from 'reactstrap';
import { TOGGLE_BUTTON_ID } from './constants';

export const Overlay = ({
  visible, children, toggle, target, ...restProps
}) => (
  <Popover
    placement="bottom"
    isOpen={visible}
    target={TOGGLE_BUTTON_ID}
    toggle={toggle}
    container={target ? target.parentElement : undefined}
    {...restProps}
  >
    <PopoverBody>
      {children}
    </PopoverBody>
  </Popover>
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  toggle: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  target: PropTypes.object,
};

Overlay.defaultProps = {
  visible: false,
  target: undefined,
};
