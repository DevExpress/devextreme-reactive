import * as React from 'react';
import * as PropTypes from 'prop-types';
import MenuItemMUI from '@mui/material/MenuItem';

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
