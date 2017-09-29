import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

export const ColumnChooserPanel = ({ children }) => (
  <List dense>
    {children}
  </List>
);

ColumnChooserPanel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};
