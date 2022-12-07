import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItem as MenuItemMUI } from '@mui/material';

export const MenuItem = React.forwardRef(({
  text, onClick, ...restProps
}, ref) => (
  <MenuItemMUI
    onClick={onClick}
    ref={ref}
    {...restProps}
  >
    {text}
  </MenuItemMUI>
));

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MenuItem.defaultProps = {
  onClick: () => {},
};
