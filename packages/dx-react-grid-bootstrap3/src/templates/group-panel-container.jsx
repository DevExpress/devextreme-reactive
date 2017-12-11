import React from 'react';
import PropTypes from 'prop-types';

export const GroupPanelContainer = ({ children }) => (
  <div>{children}</div>
);

GroupPanelContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

GroupPanelContainer.defaultProps = {
  children: null,
};

