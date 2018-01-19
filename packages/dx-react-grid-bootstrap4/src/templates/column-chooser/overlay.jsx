import React from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverBody } from 'reactstrap';
import { TOGGLE_BUTTON_ID } from './constants';

export const Overlay = ({
  visible, children,
}) => (
  <Popover placement="bottom" isOpen={visible} target={TOGGLE_BUTTON_ID} >
    <PopoverBody>
      {children}
    </PopoverBody>
  </Popover>
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
};

Overlay.defaultProps = {
  visible: false,
};
