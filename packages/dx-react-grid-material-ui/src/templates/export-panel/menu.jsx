import * as React from 'react';
import * as PropTypes from 'prop-types';
import MenuMUI from '@material-ui/core/Menu';

export const Menu = ({
  visible, target, onHide, children, ...restProps
}) => (
  <MenuMUI
    keepMounted
    open={visible}
    anchorEl={target}
    onClose={onHide}
    {...restProps}
  >
    {children}
  </MenuMUI>
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
