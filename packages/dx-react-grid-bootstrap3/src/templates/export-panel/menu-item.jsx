import * as React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';

export const MenuItem = ({
  text, onClick, ...restProps
}) => (
  <ListGroupItem
    style={{
      outline: 'none',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
    }}
    onClick={onClick}
    {...restProps}
  >
    {text}
  </ListGroupItem>
);

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MenuItem.defaultProps = {
  onClick: () => {},
};
