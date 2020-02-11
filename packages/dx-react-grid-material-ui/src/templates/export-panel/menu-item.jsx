import * as React from 'react';
import * as PropTypes from 'prop-types';
import MenuItemMUI from '@material-ui/core/MenuItem';

export const MenuItem = ({
  text, onClick, ...restProps
}) => (
  <MenuItemMUI
    onClick={onClick}
    {...restProps}
  >
    {text}
  </MenuItemMUI>
);

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MenuItem.defaultProps = {
  onClick: () => {},
};
