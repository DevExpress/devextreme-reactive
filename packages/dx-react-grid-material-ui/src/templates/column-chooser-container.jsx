import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

export const ColumnChooserContainer = ({ children }) => (
  <List dense>
    {children}
  </List>
);

ColumnChooserContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};
