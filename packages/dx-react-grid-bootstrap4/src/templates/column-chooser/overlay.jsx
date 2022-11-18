import * as React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '../../../../dx-react-bootstrap4/components';

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
        renderInBody={false}
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
