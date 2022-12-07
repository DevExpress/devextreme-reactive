import * as React from 'react';
import PropTypes from 'prop-types';
import { List } from '@mui/material';

export const Container = ({ children, ...restProps }) => (
  <List
    dense
    {...restProps}
  >
    {children}
  </List>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
