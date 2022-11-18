import * as React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '../../../../dx-react-bootstrap4/components';

export const Menu = ({
  visible, target, onHide, children, ...restProps
}) => (
  <Popover
    placement="bottom"
    isOpen={visible}
    target={target}
    toggle={onHide}
    {...restProps}
  >
    <div className="py-2">
      {children}
    </div>
  </Popover>
);

Menu.propTypes = {
  onHide: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  target: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
};

Menu.defaultProps = {
  visible: false,
  target: null,
};
