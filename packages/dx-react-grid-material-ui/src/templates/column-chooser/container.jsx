import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui';

export const Container = ({ children, ...restProps }) => (
  <List
    dense
    {...restProps}
  >
    {children}
  </List>
);

Container.propTypes = {
  children: PropTypes.array.isRequired,
};
