import React from 'react';
import PropTypes from 'prop-types';

export const ColumnChooserPanel = ({ children }) => (
  <div className="list-group">
    {children}
  </div>
);

ColumnChooserPanel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};
