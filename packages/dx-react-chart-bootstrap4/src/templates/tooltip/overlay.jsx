import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Popover } from 'reactstrap';

export const Overlay = ({
  visible, children, target, ...restProps
}) => (
  target ? (
    <Popover
      placement="top"
      isOpen={visible}
      target={target}
      {...restProps}
    >
      {children}
    </Popover>
  ) : null
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
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
