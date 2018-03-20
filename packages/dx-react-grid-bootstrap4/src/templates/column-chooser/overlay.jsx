import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Popover } from 'reactstrap';

export const Overlay = ({
  visible, children, target, onHide, ...restProps
}) => {
  const handleToggle = () => {
    if (visible) onHide();
  };
  return (
    target ? (
      <Popover
        placement="bottom"
        isOpen={visible}
        target={target}
        container={target ? target.parentElement : undefined}
        toggle={handleToggle}
        {...restProps}
      >
        {children}
      </Popover>
    ) : null
  );
};

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
