import React from 'react';
import PropTypes from 'prop-types';

export const ColumnChooserContainer = ({ children }) => (
  <div className="list-group">
    {children}
  </div>
);

ColumnChooserContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};
